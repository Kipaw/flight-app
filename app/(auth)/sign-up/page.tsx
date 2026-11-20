import type { Metadata } from "next";
import FormSignUp from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="form-section container mx-auto mt-[53px] flex w-full max-w-[1130px] flex-col gap-[30px] px-4">
      <div className="title flex flex-col gap-1">
        <h1 className="text-[32px] leading-[48px] font-bold">Sign Up</h1>
        <p className="text-lg leading-[27px] font-medium">
          Enjoy new experience of flight
        </p>
      </div>
      <FormSignUp />
    </div>
  );
}
