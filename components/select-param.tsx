"use client";

import React from "react";
import SelectForm from "./select-form";
import { NameValueObj } from "@/lib/types/objects";
import { Select } from "./ui/select";
import useUpdateSearchParams from "@/lib/hooks/useUpdateSearchParams";

export const SelectParam = ({
  name,
  options,
  ...props
}: {
  name: string;
  options: NameValueObj[];
} & Omit<React.ComponentProps<typeof Select>, "onValueChange">) => {
  const updateParams = useUpdateSearchParams(name, options[0]?.value);

  return (
    <SelectForm
      onValueChange={updateParams}
      name={name}
      options={options}
      {...props}
    />
  );
};
