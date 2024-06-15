import H2 from "@/components/H2";
import PageBody from "@/components/PageBody";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { findArticles } from "@/functions/article";
import { log } from "console";
import Link from "next/link";

async function page({ params }) {
  const searchQuery = params.searchQuery;
  const teamId = params.teamId;
  const articleData = await findArticles(searchQuery, teamId);
  log(articleData);
  return (
    <PageBody>
      <div className="flex flex-col gap-10">
        <H2>Результаты поиска </H2>
        {articleData.length > 0 ? (
          articleData.map((article) => {
            return (
              <Card key={article.id} className="w-4/6 bg-blue-50">
                <Link
                  href={`/app/t/${params.teamId}/wiki/${article.chapterId}/${article.id}`}
                >
                  <CardHeader>
                    <p className="text-lg font-semibold text-slate-700">
                      {article.name}
                    </p>
                  </CardHeader>
                  <CardContent></CardContent>
                </Link>
              </Card>
            );
          })
        ) : (
          <>Ничего не найдено</>
        )}
      </div>
    </PageBody>
  );
}

export default page;
