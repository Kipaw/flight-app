import { notFound } from "next/navigation";
import FormAirplane from "../../_components/form-airplane";
import { getAirplaneById } from "../../lib/data";

export default async function EditAirplanePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const airplane = await getAirplaneById(id);

  if (!airplane) notFound();

  return (
    <div>
      <div className="my-5 text-2xl font-bold">Edit Airplane</div>
      <FormAirplane type="EDIT" defaultValues={airplane} />
    </div>
  );
}
