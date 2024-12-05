"use client";

import { useFormState } from "react-dom";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";

import * as actions from "@/actions";
import { SubmitButton, PasswordInput } from "@/components/common";

export default function SignInForm() {
  const [formState, action] = useFormState(actions.emailSignIn, {
    errors: {},
  });
  return (
    <form className="flex flex-col gap-3" action={action}>
      <Input
        label="Email Address"
        name="email"
        placeholder="Enter your email"
        type="text"
        variant="bordered"
        isInvalid={!!formState?.errors.email}
        errorMessage={formState?.errors.email?.join(", ")}
      />
      <PasswordInput
        name="password"
        label="Password"
        placeholder="Enter your password"
        isInvalid={!!formState?.errors.password}
        errorMessage={formState?.errors.password?.join(", ")}
      />
      {formState?.errors._form && (
        <div className="rounded-xl text-sm px-3 py-2 bg-red-200 dark:bg-red-800">
          {formState?.errors._form.join(", ")}
        </div>
      )}
      <div className="flex items-center justify-between px-1 py-2">
        <Checkbox name="remember" size="sm">
          Remember me
        </Checkbox>
        <Link className="text-default-500" href="#" size="sm">
          Forgot password?
        </Link>
      </div>
      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
}
