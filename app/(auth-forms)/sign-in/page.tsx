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
import { signIn } from "@/actions/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account to access the application.",
};

export default function Component() {
  return (
    <>
      <CardHeader>
        <BackButton className="absolute top-4 left-4 z-10" />
        <CardTitle className="text-2xl font-bold text-center">
          Sign in
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details to enter the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={signIn}>
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

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </>
  );
}
