"use server";
import prisma from "@/lib/prisma";
import { getBackPath } from "@/lib/utils";
import { Article } from "@prisma/client";
import { log } from "console";
import { revalidatePath } from "next/cache";
import { Delta } from "quill/core";

export async function findArticles(
  searchQuery: string,
  teamId: string,
): Promise<Article[]> {
  const chapters = await prisma.chapter.findMany({
    where: {
      teamId,
    },
    include: {
      Articles: true,
    },
  });
  let foundArticles: Article[] = [];

  chapters.forEach((chapter) => {
    const foundChapterArticles = chapter.Articles.filter((article) => {
      if (
        article.content
          ?.toLowerCase()
          .includes(decodeURI(searchQuery).toLowerCase())
      ) {
        return article;
      }
    });
    if (foundChapterArticles.length > 0)
      foundArticles = [...foundArticles, ...foundChapterArticles];
  });
  return foundArticles;
}

export async function createArticle(
  name: string,
  chapterId: number,
  pathname: string,
) {
  await prisma.article.create({
    data: {
      name,
      chapterId,
    },
  });
}

export async function deleteArticle(articleId: number, pathname: string) {
  await prisma.article.delete({
    where: {
      id: articleId,
    },
  });
  revalidatePath(getBackPath(pathname));
}

export async function updateArticle(article: Article, pathname: string) {
  await prisma.article.update({
    where: {
      id: article.id,
    },

    data: {
      content: article.content,
      name: article.name,
    },
  });

  revalidatePath(pathname);
}
