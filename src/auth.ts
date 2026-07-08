import { Admin } from "@/models/Admin";
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        const admin = await Admin.findOne({
          email: credentials.email,
        }).lean();

        console.log("admin : ", admin);

        if (!admin) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          admin.password,
        );
        console.log("is valid : ", valid);

        if (!valid) return null;

        return {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/admin/login",
  },

  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
