import React from "react";

export default function ErrorList({ errors }: { errors: string[] }) {
  return (
    <div className="text-red-500 space-y-0.5">
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
}
