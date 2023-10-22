import UserModel from "@/models/UserModel";
import { UserDocument } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

interface NewUserData {
   newUser: {
      name: string;
      email: string;
   };
}

//Create new user
export const POST = async (req: NextRequest) => {
   const { newUser } = (await req.json()) as NewUserData;

   if (!newUser) {
      return new NextResponse("No user data provided", { status: 400 });
   }

   try {
      const user: UserDocument = new UserModel(newUser);

      await user.save();

      return new NextResponse(JSON.stringify(user), { status: 201 });
   } catch (err) {
      return new NextResponse(`Error creating user: ${err}`, { status: 500 });
   }
};
