"use server";
import prisma from "@/lib/prisma";
import { connect } from "http2";

export async function updateChapter(formdata: FormData, chapterId: number) {
  const rawFormData = {
    name: formdata.get("name")!.toString(),
    desciption: formdata.get("description")!.toString(),
  };

  await prisma.chapter.update({
    where: {
      id: chapterId,
    },
    data: {
      name: rawFormData.name,
      description: rawFormData.desciption,
    },
  });
}

export async function createTask(
  formdata: FormData,
  userId: string,
  teamId: string,
  date: Date,
) {
  const rawFormData = {
    name: formdata.get("name")!.toString(),
    desciption: formdata.get("description")!.toString(),
    userId,
    teamId,
    date,
  };

  const team = await prisma.team.findUnique({
    where: {
      id: rawFormData.teamId,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  await prisma.task.create({
    data: {
      name: rawFormData.name,
      description: rawFormData.desciption,
      expirationDate: date,
      completionStatus: false,
      Team: {
        connect: team!,
      },
      User: {
        connect: user!,
      },
    },
  });
}

export async function updateTask(formdata: FormData, taskId: string) {
  const rawFormData = {
    name: formdata.get("name")!.toString(),
    desciption: formdata.get("description")!.toString(),
  };

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      name: rawFormData.name,
      description: rawFormData.desciption,
    },
  });
}

export async function deleteTask(taskId: string) {
  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
}
