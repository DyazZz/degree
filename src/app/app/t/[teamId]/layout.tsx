import { auth } from "@/auth";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import { isUserModer } from "@/lib/utils";
import { log } from "console";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";

async function AppLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session!.user!.id,
    },
    include: {
      teams: true,
      Roles: true,
    },
  });

  const userModer = await isUserModer(session!, params.teamId);

  if ((user!.teams.filter((team) => team.id === params.teamId).length = 0))
    return <div>Страница не найдена</div>;

  return (
    <div className="relative flex flex-col text-slate-700">
      <Header type="app" teamId={params.teamId} />
      <div className="flex w-full">
        <aside className="min-h-[90dvh] w-64 border-r-2 bg-blue-100 pt-32">
          <div className="sticky top-8 flex flex-col items-center gap-4">
            <Link href={`/app/t/${params.teamId}`}>Главная</Link>
            <Link href={`/app/t/${params.teamId}/wiki`}>База знаний</Link>
            <Link href={`/app/t/${params.teamId}/tasks`}>Задания</Link>

            {userModer && (
              <Link href={`/app/t/${params.teamId}/manage`}>
                Управление командой
              </Link>
            )}
          </div>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
