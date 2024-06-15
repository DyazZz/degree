import H1 from "@/components/H1";
import PageBody from "@/components/PageBody";
import prisma from "@/lib/prisma";
import { log } from "console";
import UsersList from "./UsersList";
import H2 from "@/components/H2";

async function Page({ params }) {
  const team = await prisma.team.findUnique({
    where: {
      id: params.teamId,
    },
    include: {
      users: true,
      tasks: true,
    },
  });

  return (
    <PageBody>
      <div className="flex flex-col gap-10">
        <H1>Добро пожаловать в "{team?.name}"</H1>
        <div className="flex flex-col gap-4">
          <H2>Участники команды:</H2>
          <UsersList users={team?.users!} editable={false} />
        </div>
      </div>
    </PageBody>
  );
}

export default Page;
