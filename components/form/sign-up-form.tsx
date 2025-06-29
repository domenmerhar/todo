"use client";

import React, { useActionState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import PasswordInput from "../password-input";
import { Button } from "../ui/button";
import Form from "next/form";
import { signUp } from "@/lib/actions/auth";
import { Spinner } from "../ui/spinner";
import ErrorList from "../error-list";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, {
    errors: [],
    values: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
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
          defaultValue={state.values?.email}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          required
          defaultValue={state.values?.username}
        />
      </div>

      <PasswordInput
        placeholder="Enter your password"
        required
        id="password"
        name="password"
        defaultValue={state.values?.password}
      >
        Password
      </PasswordInput>

      <PasswordInput
        placeholder="Confirm your password"
        required
        id="confirm-password"
        name="confirm-password"
        defaultValue={state.values?.confirmPassword}
      >
        Confirm Password
      </PasswordInput>

      {state.errors && state.errors?.length > 0 ? (
        <ErrorList errors={state.errors} />
      ) : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Spinner className="text-gray-100" /> : "Create Account"}
      </Button>
    </Form>
  );
}
