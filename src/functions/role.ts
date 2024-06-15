"use server";
import prisma from "@/lib/prisma";

export async function deleteRoleFromUser(userId: string, teamId: string) {
  const role = await prisma.roles.findFirst({
    where: {
      userId,
      teamId,
    },
  });

  await prisma.roles.delete({
    where: {
      id: role?.id,
    },
  });
}
