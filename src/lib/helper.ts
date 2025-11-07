"use server";

import { cookies } from "next/headers";
import prismaClient from "./services/prisma";
import { verifyToken } from "./services/jwt";


export async function getUserFromCookies() {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value || "";
    if (!token) return null;
    const data = verifyToken(token);
    if (!data?.id) return null;

    const user = await prismaClient.user.findUnique({
      where: {
        id: data.id,
      },
      omit: {
        password: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (err : any) {
    console.log("err fetching user" ,err.message)
    return null;
  }
}

export async function userLogOut() {
  try {
    const cookie = await cookies();
    cookie.delete("token");
    return true;
  } catch (err) {
    return false;
  }
}
