"use server";

import { db } from "@/db";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/schemas";
import { DEFAULT_LOGGED_IN_REDIRECT } from "@/routes";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

interface SignUserUp {
  errors: {
    username?: string[];
    email?: string[];
    password?: string[];
    password2?: string[];
    _form?: string[];
  };
}

export async function signUp(
  _: SignUserUp,
  formData: FormData
): Promise<SignUserUp> {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const password2 = formData.get("password2");

  // Validate the form data
  const validationResult = signUpSchema.safeParse({
    email,
    password,
    username,
    password2,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  // Check if user already exists
  const user = await db.user.findUnique({
    where: { email } as { email: string },
  });
  if (user) {
    return {
      errors: {
        _form: ["User already exists"],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);
  try {
    // Create a new user
    await db.user.create({
      data: {
        name: username as string,
        email: email as string,
        password: hashedPassword,
      },
    });
  } catch (error: any) {
    return {
      errors: {
        _form: ["Failed to create a new user"],
      },
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
    return {
      errors: {
        _form: ["Failed to sign in the user"],
      },
    };
  }
  redirect(DEFAULT_LOGGED_IN_REDIRECT);
}
