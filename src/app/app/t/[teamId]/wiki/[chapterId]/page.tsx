import { auth } from "@/auth";
import { CreateArticle } from "@/components/CRUDArticle";
import { UpdateChapter } from "@/components/CRUDChapter";
import H2 from "@/components/H2";
import PageBody from "@/components/PageBody";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { isUserModer } from "@/lib/utils";
import Link from "next/link";

async function Page({ params }) {
  const session = await auth();
  const isDevMode = await isUserModer(session!, params.teamId);
  const chapterId = Number(params.chapterId);
  const articleData = await prisma.article.findMany({
    where: {
      chapterId,
    },
  });

  const chapterData = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
  });

  return (
    <PageBody>
      <div className="flex flex-col gap-10">
        <H2>{chapterData?.name} </H2>
        {isDevMode && (
          <div className="flex gap-4">
            <CreateArticle chapterId={chapterId} />
            <UpdateChapter chapter={chapterData!} />
          </div>
        )}
        {articleData.map((article) => {
          return (
            <Card key={article.id} className="w-4/6 bg-blue-50">
              <Link href={`${chapterId}/${article.id}`}>
                <CardHeader>
                  <p className="text-lg font-semibold text-slate-700">
                    {article.name}
                  </p>
                </CardHeader>
                <CardContent>
                  {/* <p>Краткое описание статьи</p> */}
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </PageBody>
  );
}

export default Page;
