import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";

//MongoDB connection for adapter
if (!process.env.MONGODB_URI) {
   throw new Error("No MongoDB URI provided");
}
const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect();

export const authOptions: NextAuthOptions = {
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_ID ?? "",
         clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
   ],
   adapter: MongoDBAdapter(clientPromise),
   callbacks: {
      // async signIn({ account, profile }) {
      //    await connectToDb();
      //    if (account?.type === "oauth") {
      //       const githubEmail = profile?.email;
      //       const existingUser = await UserModel.findOne({ email: githubEmail });
      //       console.log(existingUser);
      //       console.log(profile);
      //       if (existingUser === null) {
      //          console.log("creating new user");
      //          const newUser = {
      //             name: profile?.name!,
      //             email: profile?.email!,
      //             image: profile?.image!,
      //             emailVerified: null,
      //          };
      //          await UserModel.create(newUser);
      //       }
      //    }
      //    return true;
      // },
      session({ session, user }) {
         session.user.id = user.id;
         return session;
      },
   },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
