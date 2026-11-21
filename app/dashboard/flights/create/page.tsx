import { prisma } from "@/lib/prisma";
import FormFlight from "../_components/form-flight";

export default async function CreateFlightPage() {
  const airplanes = await prisma.airplane.findMany();

  return (
    <>
      <div className="my-5 text-2xl font-bold">Tambah Flight</div>
      <FormFlight type="ADD" airplanes={airplanes} />
    </>
  );
}
