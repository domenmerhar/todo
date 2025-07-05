import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function GroupTitleSkeleton() {
  return (
    <div className="flex gap-4 items-center mb-4">
      <Skeleton className="size-12" />

      <Skeleton className="w-3/6 h-6" />
    </div>
  );
}
