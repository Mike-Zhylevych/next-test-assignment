"use client";

import { useFormState } from "react-dom";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";

import * as actions from "@/actions";
import { SubmitButton, PasswordInput } from "@/components/common";

export default function SignUpForm() {
  const [formState, action] = useFormState(actions.signUp, {
    errors: {},
  });
  return (
    <form className="flex flex-col gap-3" action={action}>
      <Input
        label="Username"
        name="username"
        placeholder="Enter your username"
        type="text"
        variant="bordered"
        isRequired
        isInvalid={!!formState.errors.username}
        errorMessage={formState.errors.username?.join(", ")}
      />
      <Input
        label="Email Address"
        name="email"
        placeholder="Enter your email"
        type="text"
        variant="bordered"
        isRequired
        isInvalid={!!formState.errors.email}
        errorMessage={formState.errors.email?.join(", ")}
      />
      <PasswordInput
        name="password"
        label="Password"
        placeholder="Enter your password"
        isRequired
        isInvalid={!!formState.errors.password}
        errorMessage={formState.errors.password?.join(", ")}
      />
      <PasswordInput
        name="password2"
        label="Confirm Password"
        placeholder="Confirm your password"
        isRequired
        isInvalid={!!formState.errors.password2}
        errorMessage={formState.errors.password2?.join(", ")}
      />
      {formState.errors._form && (
        <div className="rounded-xl text-sm px-3 py-2 bg-red-200 dark:bg-red-800">
          {formState.errors._form.join(", ")}
        </div>
      )}
      <div className="flex items-center justify-between px-1 py-2">
        <Checkbox name="agree" size="sm">
          I agree with the <Link href="/terms">Terms</Link> and{" "}
          <Link href="/privacy">Privacy Policy</Link>
        </Checkbox>
      </div>
      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
}
