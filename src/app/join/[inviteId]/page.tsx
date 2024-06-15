import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function Page({ params }) {
  const team = await prisma.team.findUnique({
    where: {
      invitation: params.inviteId,
    },
  });
  const user = await auth();
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user!.user!.id,
    },
  });
  if (team) {
    await prisma.team.update({
      where: {
        id: team.id,
      },
      data: {
        users: {
          connect: dbUser!,
        },
      },
    });

    await prisma.roles.create({
      data: {
        userId: user!.user!.id!,
        teamId: team.id,
        name: "admin",
      },
    });
    redirect(`/app/t/${team.id}`);
  } else return <div>Команда не найдена</div>;
}

export default Page;
