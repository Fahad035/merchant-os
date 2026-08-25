import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-36 rounded-xl"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-105 lg:col-span-2 rounded-xl" />
        <Skeleton className="h-105 rounded-xl" />
      </div>

      <Skeleton className="h-87.5 rounded-xl" />
    </div>
  );
}