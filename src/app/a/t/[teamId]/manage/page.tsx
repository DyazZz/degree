import GenerateNew from "@/components/GenerateNew";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import PageBody from "@/components/PageBody";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import UsersList from "../UsersList";

async function TeamManagePage({ params }) {
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
        <H1>Управление</H1>
        <div className="flex flex-col gap-4">
          <H2>Ссылка-приглашение</H2>
          <div className="flex items-center gap-8">
            <p>onboarding.com/join/{team?.invitation}</p>
            <GenerateNew teamId={params.teamId} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <H2>Участники</H2>
          <UsersList users={team?.users!} editable={true} team={team} />
        </div>
      </div>
    </PageBody>
  );
}

export default TeamManagePage;
