export default function LoadingFilterAirline({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-5 w-20 animate-pulse rounded bg-upwego-bg-purple" />
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-5 w-32 animate-pulse rounded bg-upwego-bg-purple"
        />
      ))}
    </div>
  );
}
