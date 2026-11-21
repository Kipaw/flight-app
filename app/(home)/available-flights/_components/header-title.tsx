import { getHeader, parseFilter, type SearchParams } from "../lib/data";

export default async function HeaderTitle({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filter = parseFilter(await searchParams);
  const { title, count } = await getHeader(filter);

  return (
    <>
      <h1 className="text-[32px] leading-[48px] font-bold">{title}</h1>
      <p className="text-lg leading-[27px] font-medium">
        {count.toLocaleString("en-US")} flights available
      </p>
    </>
  );
}
