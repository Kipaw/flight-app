"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { generateSeats } from "@/lib/seats";
import type { ActionResult } from "@/lib/types";
import { formFlightSchema } from "./validation";

function parse(formData: FormData) {
  const validate = formFlightSchema.safeParse(Object.fromEntries(formData));

  if (!validate.success) {
    const result: ActionResult = {
      errorTitle: "Error Validation",
      errorDesc: validate.error.issues.map((issue) => issue.message),
    };
    return { result };
  }

  const { departureDate, arrivalDate, ...rest } = validate.data;
  return {
    data: {
      ...rest,
      departureDate: new Date(departureDate),
      arrivalDate: new Date(arrivalDate),
    },
  };
}

export async function saveFlight(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { data, result } = parse(formData);
  if (!data) return result!;

  try {
    await prisma.flight.create({
      data: { ...data, seats: { createMany: { data: generateSeats() } } },
    });
  } catch (e) {
    console.error(e);
    return {
      errorTitle: "Gagal menyimpan data",
      errorDesc: ["Terjadi kesalahan, coba lagi."],
    };
  }

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function updateFlight(
  id: string,
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const { data, result } = parse(formData);
  if (!data) return result!;

  try {
    await prisma.flight.update({ where: { id }, data });
  } catch (e) {
    console.error(e);
    return {
      errorTitle: "Gagal menyimpan data",
      errorDesc: ["Terjadi kesalahan, coba lagi."],
    };
  }

  revalidatePath("/dashboard/flights");
  redirect("/dashboard/flights");
}

export async function deleteFlight(id: string) {
  const sold = await prisma.ticket.count({ where: { flightId: id } });
  if (sold > 0) {
    return { error: "Flight ini sudah punya tiket, tidak bisa dihapus." };
  }

  await prisma.$transaction([
    prisma.flightSeat.deleteMany({ where: { flightId: id } }),
    prisma.flight.delete({ where: { id } }),
  ]);

  revalidatePath("/dashboard/flights");
  return { error: null };
}
