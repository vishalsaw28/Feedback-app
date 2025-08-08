import { getServerSession } from "next-auth"; //server-side way to check who is logged in and get their user data
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticates",
      },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id); // converts string into mongoose id
  try {
    const user = await UserModel.aggregate([
      { $match: { id: userId } },

      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "user not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: user[0].messeges,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("An unexpected error occured", error);

    return Response.json(
      {
        success: false,
        message: "user not found",
      },
      { status: 500 }
    );
  }
}
