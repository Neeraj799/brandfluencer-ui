import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      _id: string;
      name: string;
      companyRep: string;
      email: string;
      mobile: string;
      password: string;
      image: string[];
      status: boolean;
      name: string;
      instaID: string;
      email: string;
      mobile: string;
      password: string;
      image: string[];
      status: boolean;
    };

    token: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      role: string;
      _id: string;
      name: string;
      companyRep: string;
      email: string;
      mobile: string;
      password: string;
      image: string[];
      status: boolean;
      name: string;
      instaID: string;
      email: string;
      mobile: string;
      password: string;
      image: string[];
      status: boolean;
    };

    token: string;
  }
}
