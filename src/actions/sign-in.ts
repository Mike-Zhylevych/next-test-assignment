"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/schemas";
import { redirect } from "next/navigation";
import { DEFAULT_LOGGED_IN_REDIRECT } from "@/routes";
import { ThirdPartyError } from "@/auth.config";
import { THIRD_PARTY_ERROR } from "@/constants";

interface SignUserInErrors {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export async function emailSignIn(
  _: SignUserInErrors,
  formData: FormData
): Promise<SignUserInErrors> {
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate the form data
  const validationResult = signInSchema.safeParse({
    email,
    password,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  try {
    // Sign in the user with the provided credentials
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error: unknown | ThirdPartyError) {
    if ((error as ThirdPartyError)?.code === THIRD_PARTY_ERROR) {
      return {
        errors: {
          _form: ["You have signed up with a third-party provider"],
        },
      };
    }
    return {
      errors: {
        _form: ["Invalid email or password"],
      },
    };
  }

  redirect(DEFAULT_LOGGED_IN_REDIRECT);
}

export async function githubSignIn() {
  return signIn("github", { redirectTo: DEFAULT_LOGGED_IN_REDIRECT });
}

export async function googleSignIn() {
  return signIn("google", { redirectTo: DEFAULT_LOGGED_IN_REDIRECT });
}
