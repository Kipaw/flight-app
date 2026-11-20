"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { ActionResult } from "@/lib/types";
import { signUpUser } from "../lib/actions";

const initialState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const inputClass =
  "rounded-full w-full p-[12px_20px] h-[48px] bg-[#EDE8F5] appearance-none outline-none font-semibold focus:ring-2 focus:ring-upwego-light-purple";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-center text-upwego-black rounded-full bg-upwego-light-purple font-bold w-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] disabled:opacity-40"
    >
      {pending ? "Creating..." : "Create New Account"}
    </button>
  );
}

export default function FormSignUp() {
  const [state, formAction] = useActionState(signUpUser, initialState);

  return (
    <form
      action={formAction}
      className="bg-white text-upwego-black w-full max-w-[500px] flex flex-col rounded-[20px] gap-5 p-5"
    >
      {state.errorTitle !== null && (
        <div className="bg-red-500 w-full p-4 rounded-lg text-white">
          <div className="font-bold mb-4">{state.errorTitle}</div>

          <ul className="list-disc list-inside">
            {state.errorDesc?.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-5">
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Complete Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Write your name"
            className={inputClass}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="passport" className="font-medium">
            No. Passport
          </label>
          <input
            type="text"
            name="passport"
            id="passport"
            placeholder="Write passport number"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Write your email"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Type your password"
          className={inputClass}
        />
      </div>

      <SubmitButton />
      <Link
        href="/sign-in"
        className="text-center text-upwego-black hover:text-white rounded-full bg-white hover:bg-upwego-black font-semibold w-full p-[12px_30px] border border-upwego-black transition-all duration-300"
      >
        Sign In
      </Link>
    </form>
  );
}
