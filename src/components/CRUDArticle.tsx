"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { createArticle, deleteArticle } from "@/functions/article";
import { Delta } from "quill/core";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export async function CreateArticle({ chapterId }: { chapterId: number }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Новая статья</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создание новой статьи</DialogTitle>
          <DialogDescription>Введите название статьи</DialogDescription>
        </DialogHeader>
        <form
          action={async (formData) => {
            const name = formData.get("name")!.toString();
            await createArticle(name, chapterId, pathname);
            router.refresh();
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Название
              </Label>
              <Input
                required
                id="name"
                name="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Сохранить</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export async function DeleteArticle({ articleId }: { articleId: number }) {
  const router = useRouter();
  return (
    <div>hello</div>
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <Button className="w-fit">Создать раздел</Button>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[425px]">
    //     <DialogHeader>
    //       <DialogTitle>Создание нового раздела</DialogTitle>
    //       <DialogDescription>
    //         Введите данные для нового раздела
    //       </DialogDescription>
    //     </DialogHeader>
    //     <form
    //     //   action={async () => {
    //     //     await deleteArticle(articleId);
    //     //     router.back();
    //     //   }
    //     // }
    //     >
    //       <DialogFooter>
    //         <DialogClose asChild>
    //           <Button>Отмена</Button>
    //         </DialogClose>
    //         <Button type="submit">Удалить</Button>
    //       </DialogFooter>
    //     </form>
    //   </DialogContent>
    // </Dialog>
  );
}
