import { auth } from "@/auth";
import { CreateTeam } from "@/components/CRUDTeam";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Team, User } from "@prisma/client";
import { log } from "console";
import Link from "next/link";

function findTeams(user: User) {}

export default async function Home() {
  const session = await auth();
  const user = session!.user!;
  const actualUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      teams: true,
    },
  });

  return (
    <>
      <Header />
      <main className="mx-auto w-[1366px] p-8">
        <article className="flex flex-col gap-16">
          <H1>Добро пожаловать, {user.name}</H1>
          <TeamList teams={actualUser!.teams} />
        </article>
      </main>
    </>
  );
}

function TeamList({ teams }: { teams: Team[] }) {
  return (
    <section className="flex flex-col gap-4">
      <H2>Команды:</H2>

      <CreateTeam />
      <div className="flex items-center gap-4">
        {teams.map((team) => {
          return (
            <Card key={team.id} className="w-1/3">
              <Link href={`/a/t/${team.id}`}>
                <CardHeader>{team.name}</CardHeader>
                <CardContent>
                  <p>{team.description}</p>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
