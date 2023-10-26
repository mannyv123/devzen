import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/mongodb";
import { connectToDb, disconnectFromDb } from "@/utils/db";
import UserModel from "@/models/UserModel";
import { User } from "@/types/types";

export const authOptions: NextAuthOptions = {
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_ID ?? "",
         clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: {
               label: "Email:",
               type: "email",
               placeholder: "Enter your email",
            },
            password: {
               label: "Password",
               type: "password",
               placeholder: "Enter your password",
            },
         },
         async authorize(credentials) {
            await connectToDb();

            const existingUser: User | null = await UserModel.findOne({
               email: credentials?.email,
            });

            if (
               existingUser &&
               credentials?.email === existingUser.email &&
               credentials?.password === existingUser.password
            ) {
               const { _id, name, email, image } = existingUser;

               await disconnectFromDb();
               return {
                  id: _id,
                  name,
                  email,
                  image,
               };
            } else {
               await disconnectFromDb();
               return null;
            }
         },
      }),
   ],
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
   adapter: MongoDBAdapter(clientPromise),
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.user = {
               id: user.id,
               email: user.email,
               name: user.name,
               image: user.image,
            };
         }

         return token;
      },
      session({ session, token }) {
         if (token) {
            session.user = token.user as { id: string; email: string; name: string; image: string };
         }

         return session;
      },
   },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
