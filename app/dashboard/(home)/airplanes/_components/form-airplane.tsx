"use client";

import { useActionState, type FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Airplane } from "@/lib/generated/prisma/client";
import type { ActionResult } from "@/lib/types";
import SubmitButtonForm from "../../_components/submit-form-button";
import { saveAirplane, updateAirplane } from "../lib/actions";

interface FormAirplaneProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Airplane | null;
}

const initialState: ActionResult = { errorTitle: null, errorDesc: [] };

const FormAirplane: FC<FormAirplaneProps> = ({
  type = "ADD",
  defaultValues,
}) => {
  const action =
    type === "EDIT" && defaultValues
      ? updateAirplane.bind(null, defaultValues.id)
      : saveAirplane;

  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="w-[40%] space-y-4">
      {state.errorTitle !== null && (
        <div className="my-7 rounded-lg bg-red-500 p-4 text-white">
          <div className="mb-4 font-bold">{state.errorTitle}</div>
          <ul className="list-inside list-disc">
            {state.errorDesc.map((value, index) => (
              <li key={index + value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="code">Kode Pesawat</Label>
        <Input
          id="code"
          name="code"
          placeholder="Kode pesawat..."
          defaultValue={defaultValues?.code}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nama Pesawat</Label>
        <Input
          id="name"
          name="name"
          placeholder="Nama pesawat..."
          defaultValue={defaultValues?.name}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Upload foto</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required={type === "ADD"}
        />
        {type === "EDIT" && (
          <p className="text-xs text-muted-foreground">
            Kosongkan jika tidak ingin mengganti foto.
          </p>
        )}
      </div>

      <SubmitButtonForm />
    </form>
  );
};

export default FormAirplane;
