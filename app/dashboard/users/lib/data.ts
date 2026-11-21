import type { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const userSelect = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

export type UserRow = Prisma.UserGetPayload<{ select: typeof userSelect }>;

export async function getUsers(): Promise<UserRow[]> {
  return prisma.user.findMany({
    select: userSelect,
    orderBy: { createdAt: "desc" },
  });
}
