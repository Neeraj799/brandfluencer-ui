import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        const { email, password, role } = credentials;

        if (role === "brandfluencer") {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/brandfluencer/auth/sign-in`,
            {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Login failed");
          }

          const user = await res.json();
          console.log("Logged In: ", user);

          // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          }
          // Return null if user data could not be retrieved
          return null;
        } else if (role === "brand") {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/brand/auth/sign-in`,
            {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Login failed");
          }

          const user = await res.json();
          // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          }
          // Return null if user data could not be retrieved
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) return { ...token, ...user };
      if (trigger === "update" && session) {
        token.user = session.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.token = token.token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
