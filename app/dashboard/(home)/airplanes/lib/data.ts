import { prisma } from "@/lib/prisma";

export async function getAirplanes() {
  try {
    return await prisma.airplane.findMany({ orderBy: { name: "asc" } });
  } catch (error) {
    console.error("database error", error);
    return [];
  }
}

export async function getAirplaneById(id: string) {
  try {
    return await prisma.airplane.findUnique({ where: { id } });
  } catch (error) {
    console.error("database error", error);
    return null;
  }
}
