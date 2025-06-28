import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { IdLabelObj } from "@/lib/types/objects";

export default function Todo({ id, label }: IdLabelObj) {
  return (
    <div key={id} className="flex items-center gap-3">
      <Checkbox id={id} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
