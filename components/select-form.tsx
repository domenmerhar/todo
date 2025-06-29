"use client";

import React, { PropsWithChildren } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { NameValueObj } from "@/lib/types/objects";

export default function SelectForm({
  options,
  ...props
}: { options: NameValueObj[] } & React.ComponentProps<typeof Select> &
  PropsWithChildren) {
  return (
    <Select {...props} defaultValue="all">
      <SelectTrigger className="w-40 bg-gray-50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ name, value }) => (
          <SelectItem key={value} value={value}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
