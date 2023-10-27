import UserModel from "@/models/UserModel";
import { NewUserData, UserDocument } from "@/types/types";
import { connectToDb, disconnectFromDb } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//Create new user
export const POST = async (req: NextRequest) => {
   const { newUser } = (await req.json()) as NewUserData;

   if (!newUser) {
      return new NextResponse("No user data provided", { status: 400 });
   }

   try {
      await connectToDb();

      const hashedPassword = await bcrypt.hash(newUser.password, 5);

      const user: UserDocument = new UserModel({
         ...newUser,
         password: hashedPassword,
         accountType: "credentials",
      });

      await user.save();

      return new NextResponse(JSON.stringify(user), { status: 201 });
   } catch (err) {
      return new NextResponse(`Error creating user: ${err}`, { status: 500 });
   } finally {
      await disconnectFromDb();
   }
};
