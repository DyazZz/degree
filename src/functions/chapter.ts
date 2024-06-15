"use server";
import prisma from "@/lib/prisma";

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

export async function createChapter(formdata: FormData, teamId: string) {
  const rawFormData = {
    name: formdata.get("name")!.toString(),
    desciption: formdata.get("description")!.toString(),
  };

  await prisma.chapter.create({
    data: {
      name: rawFormData.name,
      description: rawFormData.desciption,
      teamId: teamId,
    },
  });
}
