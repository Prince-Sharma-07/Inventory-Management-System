import { getUserFromCookies } from "@/lib/helper";
import { createToken } from "@/lib/services/jwt";
import prismaClient from "@/lib/services/prisma";
import { cookies } from "next/headers";
import { RoleType } from "../../../../../generated/prisma";

export async function loginUser(
  _: any,
  args: {
    userCred: string;
    password: string;
  }
) {
  try {
    const cookie = await cookies();
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            email: args.userCred,
          },
          {
            username: args.userCred,
          },
        ],
      },
    });
    if (!user) return false;
    if (user?.password == args.password) {
      const token = createToken({ id: user.id });
      cookie.set("token", token);
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    console.log("Error while login ", err.message);
    return false;
  }
}

export async function createUser(
  _: any,
  args: {
    name: string;
    username: string;
    email: string;
    password: string;
    role: RoleType;
  }
) {
  try {
    const currUser = await getUserFromCookies();
    if (!currUser) return null;
    if (currUser?.role != "admin") return null;

    const user = await prismaClient.user.create({
      data: args,
    });
    if (user.id) return user;
    else return null;
  } catch (err) {
    return null;
  }
}

export async function updateUserRole(
  _: any,
  args: {
    userId: string;
    role: RoleType;
  }
) {
  try {
    const currUser = await getUserFromCookies();
    if (!currUser) return false;
    if (currUser?.role != "admin") return false;
    const updatedUser = await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: {
        role: args.role,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}

export async function updateUserProfile(
  _: any,
  args: {
    userId: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
  }
) {
  try {
    const currUser = await getUserFromCookies();
    if (currUser?.role != "admin" && currUser?.id != args.userId) return false;
    const dataToSave = {
      name: args.name,
      username: args.name,
      email: args.email,
      avatar: args.avatar,
    };
    await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: dataToSave,
    });
    return true;
  } catch (err) {
    return false;
  }
}

export async function getAllUsers() {
  try {
    const users = await prismaClient.user.findMany({
      where: {
        role: {
          not: "admin",
        },
      },
    });
    return users;
  } catch (err) {
    return null;
  }
}

export async function logoutUser() {
  try {
    const cookie = await cookies();
    cookie.delete("token");
    return true;
  } catch (err: any) {
    console.log("error on logout ", err.message);
    return false;
  }
}
