"use client";

import { ComponentProps, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface ColorPickerProps
  extends Omit<ComponentProps<typeof Button>, "value" | "onChange" | "onBlur"> {
  name?: string;
}

export function ColorPicker({
  disabled,
  name,
  className,
  size,
  ...props
}: ColorPickerProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#FFFFFF");

  return (
    <>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            {...props}
            className={cn("block", className)}
            name={name}
            onClick={() => setOpen(true)}
            size={size}
            style={{ backgroundColor: color }}
            variant="outline"
          >
            <div />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <HexColorPicker color={color} onChange={setColor} />
          <Input
            maxLength={7}
            onChange={(e) => setColor(e.currentTarget.value)}
            ref={ref}
            value={color}
          />
        </PopoverContent>
      </Popover>

      <input type="hidden" name={name} value={color} readOnly />
    </>
  );
}
