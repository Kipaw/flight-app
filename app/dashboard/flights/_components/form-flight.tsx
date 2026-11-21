"use client";

import { type FC, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Airplane, Flight } from "@/lib/generated/prisma/client";
import SubmitButtonForm from "../../_components/submit-form-button";
import type { ActionResult } from "@/lib/types";
import { saveFlight, updateFlight } from "../lib/actions";

interface FormFlightProps {
  type?: "ADD" | "EDIT";
  airplanes: Airplane[];
  defaultValues?: Flight | null;
}

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

// Date -> "YYYY-MM-DDTHH:mm" untuk <input type="datetime-local">
function toInputDate(date?: Date) {
  if (!date) return undefined;
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

const FormFlight: FC<FormFlightProps> = ({
  type = "ADD",
  airplanes,
  defaultValues,
}) => {
  const isEdit = type === "EDIT" && !!defaultValues;

  const [state, formAction] = useActionState(
    isEdit ? updateFlight.bind(null, defaultValues.id) : saveFlight,
    initialFormState,
  );

  return (
    <form action={formAction} className="space-y-6">
      {state.errorTitle !== null && (
        <div className="my-7 rounded-lg bg-red-500 p-4 text-white">
          <div className="mb-4 font-bold">{state.errorTitle}</div>
          <ul className="list-inside list-disc">
            {state.errorDesc?.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="planeId">Pilih Pesawat</Label>
          <Select name="planeId" defaultValue={defaultValues?.planeId}>
            <SelectTrigger id="planeId">
              <SelectValue placeholder="Pilih pesawat" />
            </SelectTrigger>
            <SelectContent>
              {airplanes.map((value) => (
                <SelectItem key={value.id} value={value.id}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="departureCity">Kota Asal</Label>
          <Input
            id="departureCity"
            name="departureCity"
            placeholder="Semarang"
            defaultValue={defaultValues?.departureCity}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="departureCityCode">Kode Kota Asal</Label>
          <Input
            id="departureCityCode"
            name="departureCityCode"
            placeholder="SMG"
            defaultValue={defaultValues?.departureCityCode}
            required
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="departureDate">Tanggal Keberangkatan</Label>
          <Input
            id="departureDate"
            type="datetime-local"
            name="departureDate"
            defaultValue={toInputDate(defaultValues?.departureDate)}
            suppressHydrationWarning
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destinationCity">Kota Tujuan</Label>
          <Input
            id="destinationCity"
            name="destinationCity"
            placeholder="Surabaya"
            defaultValue={defaultValues?.destinationCity}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationCityCode">Kode Kota Tujuan</Label>
          <Input
            id="destinationCityCode"
            name="destinationCityCode"
            placeholder="SBY"
            defaultValue={defaultValues?.destinationCityCode}
            required
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="arrivalDate">Tanggal Kedatangan</Label>
          <Input
            id="arrivalDate"
            type="datetime-local"
            name="arrivalDate"
            defaultValue={toInputDate(defaultValues?.arrivalDate)}
            suppressHydrationWarning
            required
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="price">Harga Kelas Economy</Label>
          <Input
            id="price"
            type="number"
            min={0}
            name="price"
            placeholder="Harga..."
            defaultValue={defaultValues?.price}
            required
          />
        </div>
      </div>

      <SubmitButtonForm />
    </form>
  );
};

export default FormFlight;
