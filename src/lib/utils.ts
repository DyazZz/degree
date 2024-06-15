import { type ClassValue, clsx } from "clsx";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";
import { Session } from "next-auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBackPath(path: string) {
  const paths = path.split("/");
  paths.pop();
  const backPath = paths.join("/");
  return backPath;
}

export async function isUserModer(session: Session, teamId: string) {
  const userRole = await prisma.roles.findMany({
    where: {
      userId: session.user!.id,
      teamId,
    },
  });

  if (!userRole[0]) return false;

  if (userRole[0].name === "admin") {
    return true;
  }
}
