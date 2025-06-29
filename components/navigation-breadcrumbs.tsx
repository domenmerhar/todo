"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function NavigationBreadcrumb({ className }: { className?: string }) {
  const path = usePathname();
  const paths = path.split("/").filter((p) => p !== "");

  const lastIndex = paths.length - 1;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {paths.map((p, i) => (
          <>
            {i === lastIndex ? (
              <BreadcrumbPage key={p}>
                <BreadcrumbLink asChild>
                  <Link href={`/${p}`}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbPage>
            ) : (
              <BreadcrumbItem key={p}>
                <BreadcrumbLink asChild>
                  <Link href={`/${p}`}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}

            <BreadcrumbSeparator
              key={`${p}-separator`}
              className="last:hidden"
            />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
