import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String, //In mongoose the String(s) is written in capital
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, " Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    unique: true,
    required: [true, "Password is required"],
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Enter a strong password",
    ],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isAcceptingMessage: {
    type: Boolean,
    required: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.user as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
