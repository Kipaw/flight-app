import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormFlight from "../../_components/form-flight";

export default async function EditFlightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [flight, airplanes] = await Promise.all([
    prisma.flight.findUnique({ where: { id } }),
    prisma.airplane.findMany(),
  ]);
  if (!flight) notFound();

  return (
    <>
      <div className="my-5 text-2xl font-bold">Edit Flight</div>
      <FormFlight type="EDIT" airplanes={airplanes} defaultValues={flight} />
    </>
  );
}
