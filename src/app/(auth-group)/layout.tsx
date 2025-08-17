import Header from "@/components/layout/Header";
import UserContextProvider from "@/contexts/UserContextProvider";
import { getUserFromCookies } from "@/lib/helper";
import { ReactNode } from "react";
export const dynamic = "force-dynamic";
 
export default async function layout({ children }: { children: ReactNode }) {
  const user = await getUserFromCookies();
  console.log("user in layout->", user);
  // if (!user) redirect("/login");
  return (
    <div className="min-h-screen">
      <UserContextProvider currUser={user}>
        <Header />
        {children}
      </UserContextProvider>
    </div>
  );
}
