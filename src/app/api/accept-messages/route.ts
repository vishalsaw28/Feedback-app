import { getServerSession } from "next-auth"; //server-side way to check who is logged in and get their user data
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user; // The user type is User (user: User)

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticates",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User is not updated",
        },
        { status: 401 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Message acceptence status updated successfully ",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("failed to update user status to accept messagess");

    return Response.json(
      {
        success: false,
        message: "failed to updadte the user status to accept messages",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: "faslse",
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const foundUser = await UserModel.findById(userId);
  try {
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update user status to accept messagess");

    return Response.json(
      {
        success: false,
        message: "Error in getting acceptance status",
      },
      { status: 500 }
    );
  }
}
