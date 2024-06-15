import { auth } from "@/auth";
import ArticleEditor from "@/components/ArticleEditor";
import PageBody from "@/components/PageBody";
import prisma from "@/lib/prisma";
import { isUserModer } from "@/lib/utils";
import { cookies } from "next/headers";

export const fetchCache = "force-no-store";

async function Page({ params }) {
  const session = await auth();
  const isDevMode = await isUserModer(session!, params.teamId);
  const articleId = Number(params.articleId);
  const articleData = await prisma.article.findUnique({
    where: {
      id: articleId,
    },
  });
  return (
    <PageBody>
      <div className="flex flex-col gap-4">
        {articleData && (
          <ArticleEditor article={articleData} isEditable={isDevMode} />
        )}
      </div>
    </PageBody>
  );
}

export default Page;
