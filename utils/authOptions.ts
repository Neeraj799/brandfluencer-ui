import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        // The name to display on the sign-in form (e.g. "Sign in with...")
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials, req) => {
          if (!credentials || !credentials.email || !credentials.password)
            return null;
          const { email, password } = credentials;
  
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/brand/auth/sign-in`,
            {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: { "Content-Type": "application/json"},
            }
          );          
  
          if (res.status == 401 || res.status == 403) {
            // const error = new Error("Invalid credentials");
            console.log("Invalid credentials");
            return null;
          }
          if (res.status !== 200) {
            // const error = new Error("Invalid credentials");
            // console.log("Internal Server Error");
            return null;
          }
          const {user} = await res.json();
          console.log("Logged In: ", user);
  
          return user;
          // return Promise.resolve(user);
        },
      }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
  
    callbacks: {
      async jwt({ user, token, trigger, session }) {
        // console.log("JWT Callback", { token, user, trigger, session });
  
        if (trigger === "update") {
          return { ...token, ...session.user };
        }
  
        if (user) return { ...token, ...user };
        return token;
      },
  
      async session({ token, session }) {
        console.log("Session Callback", { token, session });
        session.user = token.user;
        session.token = token.token;
        
        console.log("Session", { session });
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
    // Add other NextAuth.js options as needed
  };