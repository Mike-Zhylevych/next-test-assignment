"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/schemas";
import { DEFAULT_LOGGED_IN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

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
): Promise<SignUserInErrors | void> {
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
  } catch (error: any) {
    if (error?.code === "3rd-party") {
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
