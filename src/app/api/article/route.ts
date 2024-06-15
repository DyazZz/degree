import prisma from "@/lib/prisma";
import { log } from "console";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const articleData = await req.json();

  log(articleData);
  const data = await prisma.article.update({
    where: {
      id: articleData.articleId,
    },
    data: {
      content: JSON.stringify(articleData.content),
    },
  });
  return NextResponse.json(data);
}
