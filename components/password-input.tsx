"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";

export default function PasswordInput({
  children,
  id,
  ...props
}: {
  children: string;
} & ComponentProps<"input">) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{children}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showConfirmPassword ? "text" : "password"}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          <span className="sr-only">
            {showConfirmPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    </div>
  );
}
