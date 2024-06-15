"use server";
import prisma from "@/lib/prisma";
import { Team, User } from "@prisma/client";
import { log } from "console";

export async function updateTeam(updateTeam: any, teamId: string) {
  await prisma.team.update({
    where: {
      id: teamId,
    },
    data: updateTeam,
  });
}

export async function deleteUserFromTeam(team: Team, user: User) {
  log("deletion");
  await prisma.team.update({
    where: {
      id: team.id,
    },

    data: {
      users: {
        disconnect: [{ id: user.id }],
      },
    },
  });
}
