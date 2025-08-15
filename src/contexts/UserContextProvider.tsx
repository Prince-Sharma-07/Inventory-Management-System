"use client";
import { UserWithoutPassword } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

const userContext = createContext<{
  user: UserWithoutPassword | null;
  setUser: (val: UserWithoutPassword | null) => void;
}>({
  user : null,
  setUser: ()=>{}
});

export default function UserContextProvider({
  children,
  currUser,
}: {
  children: ReactNode;
  currUser: UserWithoutPassword | null;
}) {
  const [user, setUser] = useState<UserWithoutPassword | null>(currUser);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext);
}
