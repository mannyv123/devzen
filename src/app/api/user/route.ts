import UserModel from "@/models/UserModel";
import { NewUserData, UserDocument } from "@/types/types";
import { connectToDb, disconnectFromDb } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

//Create new user
export const POST = async (req: NextRequest) => {
   const { newUser } = (await req.json()) as NewUserData;

   if (!newUser) {
      return new NextResponse("No user data provided", { status: 400 });
   }

   try {
      await connectToDb();

      const user: UserDocument = new UserModel({ ...newUser, accountType: "credentials" });

      await user.save();

      await disconnectFromDb();
      return new NextResponse(JSON.stringify(user), { status: 201 });
   } catch (err) {
      return new NextResponse(`Error creating user: ${err}`, { status: 500 });
   }
};
