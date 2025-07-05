import type React from "react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import BackButton from "@/components/back-button";
import { Metadata } from "next";
import SignUpForm from "@/components/form/sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a new account to access the application.",
};

export default function SignUpPage() {
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
        <SignUpForm />

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
