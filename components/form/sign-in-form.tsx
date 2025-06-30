"use client";

import { signIn } from "@/lib/actions/auth";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "../ui/input";
import PasswordInput from "../password-input";
import { Button } from "../ui/button";
import Form from "next/form";
import { useActionState } from "react";
import { Spinner } from "../ui/spinner";
import ErrorList from "../error-list";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signIn, {
    errors: [],
    values: {
      email: "",
      password: "",
    },
  });

  return (
    <Form className="space-y-4" action={formAction} formMethod="POST">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          defaultValue={state?.values?.email}
        />
      </div>

      <PasswordInput
        placeholder="Enter your password"
        required
        id="password"
        defaultValue={state?.values?.password}
        name="password"
      >
        Password
      </PasswordInput>

      {state?.errors && state?.errors?.length > 0 ? (
        <ErrorList errors={state?.errors} />
      ) : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Spinner className="text-gray-100" /> : "Sign In"}
      </Button>
    </Form>
  );
}
