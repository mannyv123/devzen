import UserModel from "@/models/UserModel";
import { connectToDb, disconnectFromDb } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

//Email in use check
export const GET = async (req: NextRequest, { params }: { params: { userEmail: string } }) => {
   const userEmail = params.userEmail;

   if (!userEmail) {
      return new NextResponse("No email provided", { status: 400 });
   }

   try {
      await connectToDb();
      const isEmailInUse = (await UserModel.find({ email: userEmail })).length === 0 ? false : true;
      return new NextResponse(JSON.stringify({ isEmailInUse }), { status: 200 });
   } catch (err) {
      return new NextResponse(`Error checking email: ${err}`, { status: 500 });
   } finally {
      await disconnectFromDb();
   }
};
