import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/mongodb";

export const authOptions: NextAuthOptions = {
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_ID ?? "",
         clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            username: {
               label: "Username:",
               type: "text",
               placeholder: "Enter your username",
            },
            password: {
               label: "Password",
               type: "password",
            },
         },
         authorize(credentials) {
            //temp user
            const user = {
               id: "123",
               name: "Email Manjot",
               username: "email_manjot",
               password: "password",
               email: "email@manjot.com",
            };

            console.log(credentials);

            if (credentials?.username === user.username && credentials.password === user.password) {
               console.log("user", user);
               return user;
            } else {
               console.log("wrong");
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
      session({ session, user, token }) {
         console.log(user);
         console.log(session);
         console.log(token);
         if (user) {
            session.user.id = user.id;
         } else {
            session.user.id = token.sub!;
         }

         return session;
      },
   },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
