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
import { Fragment } from "react";

export function NavigationBreadcrumb({ className }: { className?: string }) {
  const path = usePathname();
  const paths = path.split("/").filter((p) => p !== "");

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {paths.map((p, i) => {
          const isLast = i === paths.length - 1;
          const pathHref = `/${paths.slice(0, i + 1).join("/")}`;

          return (
            <Fragment key={p}>
              {isLast ? (
                <BreadcrumbPage>
                  <BreadcrumbLink asChild>
                    <Link href={pathHref}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={pathHref}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}

              <BreadcrumbSeparator className="last:hidden" />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
