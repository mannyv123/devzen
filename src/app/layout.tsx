import { connectToDb, disconnectFromDb } from "@/utils/db";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "@/redux/provider";
import { getServerSession } from "next-auth";
import SessionProvider from "@/SessionProvider/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
   title: "DevZen",
   description: "DevZen App",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const session = await getServerSession(authOptions);

   //Handle disconnection from db on app exit
   const handleAppExit = async () => {
      try {
         await disconnectFromDb();
         // eslint-disable-next-line no-console
         console.log("Disconnected from the database");
      } catch (err) {
         throw new Error(`Error disconnecting from the database: ${err}`);
      }
   };

   //Connect to the db when the application starts
   if (session) {
      try {
         await connectToDb();
      } catch (err) {
         throw new Error(`Error connecting to the database: ${err}`);
      }
   }

   process.on("exit", handleAppExit);
   process.on("SIGINT", () => {
      handleAppExit;
      console.log("exited on app termination");
      process.exit(0);
   });
   process.on("SIGTERM", handleAppExit);

   return (
      <html lang='en'>
         <Providers>
            <SessionProvider session={session}>
               <body className={roboto.className}>{children}</body>
            </SessionProvider>
         </Providers>
      </html>
   );
}
