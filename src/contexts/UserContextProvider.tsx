"use client";
import { UserWithoutPassword } from "@/types";
import { createContext, ReactNode, useContext } from "react";

const userContext = createContext<{
  user?: UserWithoutPassword;
}>({});

export default function UserContextProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserWithoutPassword;
}) {
  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext);
}
