"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NameValueObj } from "@/lib/types/icons";
import { comboboxRenderFn } from "@/lib/types/combobox";

export function Combobox({
  options,
  renderFn,
}: {
  options: NameValueObj[];
  renderFn?: comboboxRenderFn;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [query, setQuery] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.name === value)?.name
            : "Select option..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search option..."
            className="h-9"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {filteredOptions.length === 0 && (
              <CommandEmpty>No option found.</CommandEmpty>
            )}
            <CommandGroup>
              {filteredOptions.slice(0, 20).map((option) => {
                return (
                  <CommandItem
                    key={option.name}
                    value={option.name}
                    onSelect={(currentValue) => {
                      setOpen(false);

                      setTimeout(() => {
                        setValue(currentValue === value ? "" : currentValue);
                        setQuery("");
                      }, 300);
                    }}
                  >
                    <>
                      {renderFn ? renderFn(option) : option.name}

                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === option.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
