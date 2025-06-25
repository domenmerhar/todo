import { ICONS } from "@/lib/constants/icons";
import { comboboxRenderFn } from "@/lib/types/combobox";
import React from "react";
import { Combobox } from "../ui/combobox";
import { normalisePascalCase } from "@/lib/util/string-utils";

const renderIconOption: comboboxRenderFn = (option) => {
  const Icon = option.value;

  const formattedName = normalisePascalCase(option.name);

  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-4 w-4 mr-2 inline-block" />
      <span>{formattedName}</span>
    </div>
  );
};

export default function IconCombobox() {
  return <Combobox options={ICONS} renderFn={renderIconOption} />;
}
