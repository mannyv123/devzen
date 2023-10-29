import { UserDocument } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   accountType: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      default: null,
   },
   emailVerified: {
      type: String,
      default: null,
   },
});

const UserModel = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
