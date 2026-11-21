"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/get-user";
import { prisma } from "@/lib/prisma";
import type { ActionResult } from "@/lib/types";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "airplanes");
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

async function requireAdmin() {
  const user = await getUser();
  if (!user || user.role !== "ADMIN") redirect("/sign-in");
}

function fail(...desc: string[]): ActionResult {
  return { errorTitle: "Failed to save data", errorDesc: desc };
}

function validateText(formData: FormData) {
  const code = String(formData.get("code") ?? "")
    .trim()
    .toUpperCase();
  const name = String(formData.get("name") ?? "").trim();

  const errors: string[] = [];
  if (!code) errors.push("Airplane code is required");
  if (!name) errors.push("Airplane name is required");

  return { code, name, errors };
}

function validateImage(file: File | null) {
  if (!file || file.size === 0) return "Photo is required";
  if (!EXT[file.type]) return "Photo must be a JPG, PNG, or WEBP file";
  if (file.size > MAX_SIZE) return "Photo must be 2 MB or smaller";
  return null;
}

async function saveImage(file: File) {
  const filename = `${randomUUID()}.${EXT[file.type]}`;

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(
    path.join(UPLOAD_DIR, filename),
    Buffer.from(await file.arrayBuffer()),
  );

  return `/uploads/airplanes/${filename}`;
}

// Hanya hapus file lokal hasil upload. URL eksternal (seed) diabaikan.
async function removeImage(imagePath: string) {
  if (!imagePath.startsWith("/uploads/airplanes/")) return;

  const filePath = path.join(UPLOAD_DIR, path.basename(imagePath));
  try {
    await unlink(filePath);
  } catch {
    // file sudah tidak ada, abaikan
  }
}

export async function saveAirplane(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const { code, name, errors } = validateText(formData);
  const file = formData.get("image") as File | null;
  const imageError = validateImage(file);
  if (imageError) errors.push(imageError);
  if (errors.length) return fail(...errors);

  try {
    const image = await saveImage(file as File);
    await prisma.airplane.create({ data: { code, name, image } });
  } catch (error) {
    console.error("save airplane error", error);
    return fail("Something went wrong on the server");
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function updateAirplane(
  id: string,
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const { code, name, errors } = validateText(formData);
  const file = formData.get("image") as File | null;
  const hasNewImage = !!file && file.size > 0;

  if (hasNewImage) {
    const imageError = validateImage(file);
    if (imageError) errors.push(imageError);
  }
  if (errors.length) return fail(...errors);

  try {
    const current = await prisma.airplane.findUnique({ where: { id } });
    if (!current) return fail("Airplane not found");

    const data: { code: string; name: string; image?: string } = { code, name };
    if (hasNewImage) data.image = await saveImage(file as File);

    await prisma.airplane.update({ where: { id }, data });

    if (hasNewImage) await removeImage(current.image);
  } catch (error) {
    console.error("update airplane error", error);
    return fail("Something went wrong on the server");
  }

  revalidatePath("/dashboard/airplanes");
  redirect("/dashboard/airplanes");
}

export async function deleteAirplane(
  id: string,
): Promise<{ error: string | null }> {
  await requireAdmin();

  try {
    const used = await prisma.flight.count({ where: { planeId: id } });
    if (used > 0) {
      return {
        error: `This airplane is used by ${used} flight(s). Delete those flights first.`,
      };
    }

    const plane = await prisma.airplane.delete({ where: { id } });
    await removeImage(plane.image);
  } catch (error) {
    console.error("delete airplane error", error);
    return { error: "Something went wrong on the server" };
  }

  revalidatePath("/dashboard/airplanes");
  return { error: null };
}
