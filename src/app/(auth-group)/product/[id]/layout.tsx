import { getUserFromCookies } from "@/lib/helper";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function ({ children }: { children: ReactNode }) {
  const user = await getUserFromCookies();
  if (!user) redirect("/login");
  return <div>{children}</div>;
}
