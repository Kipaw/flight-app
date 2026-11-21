import FormAirplane from "../_components/form-airplane";

export default function CreateAirplanePage() {
  return (
    <div>
      <div className="my-5 text-2xl font-bold">Tambah data Airplane</div>
      <FormAirplane type="ADD" />
    </div>
  );
}
