import type { Metadata } from "next";
import { Suspense } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./_components/columns-user";
import { getUsers } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Users",
};

async function UserTable() {
  const users = await getUsers();

  return <DataTable columns={columns} data={users} />;
}

function UserTableSkeleton() {
  return (
    <div className="space-y-3 rounded-md border p-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

export default function UsersPage() {
  return (
    <>
      <div className="my-5 text-2xl font-bold">Users</div>

      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable />
      </Suspense>
    </>
  );
}
