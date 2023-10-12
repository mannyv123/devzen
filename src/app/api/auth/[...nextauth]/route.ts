import UserModel from "@/models/UserModel";
import { NewUser } from "@/types/types";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_ID ?? "",
         clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
   ],
   callbacks: {
      async signIn({ account, profile }) {
         if (account?.type === "oauth") {
            const githubEmail = profile?.email;
            const existingUser = await UserModel.findOne({ email: githubEmail });

            if (!existingUser && profile) {
               const newUser: NewUser = {
                  name: profile.name!,
                  email: profile.email!,
                  accountType: "oauth",
               };
               await UserModel.create(newUser);
            }
         }
         return true;
      },
   },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
