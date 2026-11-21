"use client";

import Form from "next/form";

export default function FilterForm({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Form
      action="/available-flights"
      onChange={(e) => e.currentTarget.requestSubmit()}
      className="ticket-filter flex w-[230px] shrink-0 flex-col gap-[30px] text-upwego-off-purple"
    >
      {children}
    </Form>
  );
}
