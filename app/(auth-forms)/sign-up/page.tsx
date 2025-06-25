import type React from "react";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import PasswordInput from "@/components/password-input";
import BackButton from "@/components/back-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a new account to access the application.",
};

export default function Component() {
  return (
    <>
      <CardHeader>
        <BackButton className="absolute top-4 left-4 z-10" />
        <CardTitle className="text-2xl font-bold text-center">
          Create Account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>

          <PasswordInput
            placeholder="Enter your password"
            required
            id="password"
          >
            Password
          </PasswordInput>

          <PasswordInput
            placeholder="Confirm your password"
            required
            id="confirm-password"
          >
            Confirm Password
          </PasswordInput>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </>
  );
}
