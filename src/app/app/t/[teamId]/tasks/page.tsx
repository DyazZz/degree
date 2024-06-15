import { auth } from "@/auth";
import { CreateTask } from "@/components/CRUDTask";
import H1 from "@/components/H1";
import PageBody from "@/components/PageBody";
import prisma from "@/lib/prisma";
import TasksBody from "./TasksBody";
import { isUserModer } from "@/lib/utils";

async function Page({ params }) {
  const user = await auth();
  const team = await prisma.team.findUnique({
    where: {
      id: params.teamId,
    },
    include: {
      users: true,
    },
  });
  const tasks = await prisma.task.findMany({
    where: {
      userId: user!.user!.id,
    },
    orderBy: {
      expirationDate: "desc",
    },
  });
  const devMode = await isUserModer(user!, params.teamId);
  return (
    <PageBody>
      <div className="flex flex-col gap-10">
        <div className="flex gap-5">
          <H1>Задания</H1>
          {devMode && <CreateTask teamId={params.teamId} users={team!.users} />}
        </div>
        <TasksBody tasks={tasks} />
      </div>
    </PageBody>
  );
}

export default Page;
