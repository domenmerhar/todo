import React from "react";

export default function Avatar({
  children,
  className,
  variant,
}: {
  children: string;
  variant: "small" | "medium" | "large";
  className?: string;
}) {
  const size =
    variant === "small"
      ? "w-8 h-8 text-xs"
      : variant === "medium"
        ? "w-10 h-10 text-sm"
        : "w-12 h-12 text-base";

  return (
    <div
      className={`${size} rounded-xl text-secondary flex justify-center items-center pb-0.5 font-semibold bg-primary ${className ? className : ""}`}
    >
      {children.toUpperCase().slice(0, 2)}
    </div>
  );
}
