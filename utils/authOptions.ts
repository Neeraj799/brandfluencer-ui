import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        const { email, password } = credentials;

        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/brand/auth/sign-in`,
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        console.log("Logged In: ", data);
        
      // If no error and we have user data, return it
      if (res.ok && data) {
        return data
      }
      // Return null if user data could not be retrieved
      return null
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      return {...token, ...user}
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token
      return session
    }
  },
  // pages: {
  //   signIn: "/login",
  // },
  // Add other NextAuth.js options as needed
};
