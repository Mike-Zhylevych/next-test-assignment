"use server";

import { z } from "zod";

interface SignUserIn {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

const signUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty" })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password cannot be longer than 16 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export async function signIn(
  _: SignUserIn,
  formData: FormData
): Promise<SignUserIn> {
  const validationResult = signUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  return {
    errors: {},
  };
}

export async function githubSignIn() {
  console.log("Github Sign in");
}

export async function googleSignIn() {
  console.log("Google Sign in");
}
