import { db } from "@/db";
import type { User } from "@prisma/client";

import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import type { NextAuthConfig } from "next-auth";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing github oauth credentials");
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing google oauth credentials");
}

// Custom error for third-party sign-in
class ThirdPartyError extends CredentialsSignin {
  code = "3rd-party";
}

export default {
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(
        credentials: any
      ): Promise<User | null | ThirdPartyError> {
        const { email, password } = credentials;

        // Validate the form data
        const user = await db.user.findUnique({
          where: { email },
        });
        if (!user) return null;

        // User might be authenticated with a third-party provider and not have a password
        if (!user?.password) {
          throw new ThirdPartyError();
        }

        // Check if the password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) return user;
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
