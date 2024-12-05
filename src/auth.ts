import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { a } from "framer-motion/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});

// export const {
//   handlers: { GET, POST },
//   auth,
//   signOut,
//   signIn,
// } = NextAuth({
//   adapter: PrismaAdapter(db),
//   providers: [
//     Github({
//       clientId: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//     }),
//     Credentials({
//       async authorize(credentials: any) {
//         const user = await db.user.findUnique({
//           where: { email: credentials.email },
//         });
//         if (user && user.password) {
//           const isValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );

//           if (isValid) {
//             console.log("VALID");
//             return user;
//           }
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }: any) {
//       if (session && user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//     async jwt({ token, user }: any) {
//       if (user) {
//         console.log("JWT", user);
//         token.id = user.id;
//       }
//       return token;
//     },
//   },
// });
