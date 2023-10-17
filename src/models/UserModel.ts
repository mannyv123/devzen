import { UserDocument } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      emailVerified: {
         type: String,
         required: true,
      },
   },
   { timestamps: true },
);

const UserModel = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
