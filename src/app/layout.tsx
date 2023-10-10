import { connectToDb, disconnectFromDb } from "@/utils/db";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "@/redux/provider";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
   title: "DevZen",
   description: "DevZen App",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   //Connect to the db when the application starts
   try {
      await connectToDb();
   } catch (err) {
      throw new Error(`Error connecting to the database: ${err}`);
   }

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

   process.on("exit", handleAppExit);
   process.on("SIGINT", handleAppExit);
   process.on("SIGTERM", handleAppExit);

   return (
      <html lang='en'>
         <Providers>
            <body className={roboto.className}>{children}</body>
         </Providers>
      </html>
   );
}
