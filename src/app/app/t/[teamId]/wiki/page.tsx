import { auth } from "@/auth";
import { CreateChapter } from "@/components/CRUDChapter";
import H1 from "@/components/H1";
import PageBody from "@/components/PageBody";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { isUserModer } from "@/lib/utils";
import { log } from "console";
import { cookies } from "next/headers";
import Link from "next/link";

async function Page({ params }) {
  const session = await auth();
  const isDevMode = await isUserModer(session!, params.teamId);

  const chapterData = await prisma.chapter.findMany({
    where: { teamId: params.teamId },
  });
  const team = await prisma.team.findUnique({
    where: {
      id: params.teamId,
    },
  });
  return (
    <PageBody>
      <div className="flex flex-col gap-10">
        <H1>База знаний</H1>
        {isDevMode && <CreateChapter teamId={params.teamId} />}
        {chapterData.map((chapter) => {
          return (
            <Card key={chapter.id} className="w-4/6 bg-blue-50">
              <Link href={`wiki/${chapter.id}`}>
                <CardHeader>
                  <p className="text-xl font-semibold">{chapter.name}</p>
                </CardHeader>
                <CardContent>
                  <p>{chapter.description}</p>
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
