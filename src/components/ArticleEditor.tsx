"use client";

import Quill from "quill";
import { useCallback, useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import { Delta } from "quill/core";
import { Article } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { deleteArticle, updateArticle } from "@/functions/article";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function ArticleEditor({
  article,
  isEditable,
}: {
  article: Article;
  isEditable?: boolean;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [quill, setQuill] = useState<Quill>();
  const [isSaving, setIsSaving] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const wrapperRef = useCallback(
    (wrapper: HTMLElement) => {
      if (wrapper == null) return;
      wrapper.innerHTML = "";
      try {
        const editor = document.createElement("div");
        wrapper.append(editor);

        const q = new Quill(editor, {
          theme: "snow",
          modules: {
            //TOOLBAR_OPTIONS
            toolbar: isEdit ? TOOLBAR_OPTIONS : false, //false
          },
        });

        q.enable(isEdit ? true : false); //false
        q.setContents(
          JSON.parse(
            article.content ? article.content : '{"ops":[{"insert":""}]}',
          ),
        );
        setQuill(q);
      } catch (e) {
        console.log(e);
      }
    },
    [article.content, isEdit],
  );

  useEffect(
    function () {
      if (!quill) return;
      const handler = () => {};

      quill.on("text-change", handler);

      return () => {
        quill.off("text-change", handler);
      };
    },
    [quill],
  );

  useEffect(() => {}, []);

  return (
    <div className="relative w-fit">
      {!isEdit && isEditable && (
        <Button onClick={() => setIsEdit(!isEdit)}>Редактировать</Button>
      )}
      <div className="w-[55rem]" id="container" ref={wrapperRef}></div>
      {isEdit && (
        <div className="mt-4 flex flex-row-reverse gap-4">
          <Button
            disabled={isSaving}
            onClick={async () => {
              setIsSaving(true);
              await updateArticle(
                {
                  ...article,
                  content: JSON.stringify(quill!.getContents()),
                },
                pathname,
              );
              router.refresh();
            }}
          >
            {isSaving ? "Сохранение..." : "Сохранить"}
          </Button>
          <Button disabled={isSaving} onClick={() => setIsEdit(false)}>
            Отмена
          </Button>
          <Button
            disabled={isSaving}
            onClick={async () => {
              setIsSaving(true);
              await deleteArticle(article.id, pathname);
              router.back();
            }}
          >
            Удалить статью
          </Button>
        </div>
      )}
    </div>
  );
}

export default ArticleEditor;
