"use client";
import AdminDashboard from "@/components/layout/AdminDashboard";
import AllProducts from "@/components/myUI/AllProducts";
import { useUserContext } from "@/contexts/UserContextProvider";

export default function Home() {
  const { user } = useUserContext();
  return (
    <main className="flex w-full justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 gap-6">
      {user?.role == "admin" ? (
        <AllProducts
          className={
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
          }
        />
      ) : (
        <AllProducts
          className={
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          }
        />
      )}
      {user?.role == "admin" && <AdminDashboard />}
    </main>
  );
}
