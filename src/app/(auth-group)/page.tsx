// "use client";
// import AdminDashboard from "@/components/layout/AdminDashboard";
// import AllProducts from "@/components/myUI/AllProducts";
// import { useUserContext } from "@/contexts/UserContextProvider";

// export default function Home() {
//   const { user } = useUserContext();
//   return (
//     <main className="flex w-full justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 gap-6">
//       {user?.role == "admin" ? (
//         <AllProducts
//           className={
//             "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
//           }
//         />
//       ) : (
//         <AllProducts
//           className={
//             "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
//           }
//         />
//       )}
//       {user?.role == "admin" && <AdminDashboard />}
//     </main>
//   );
// }

"use client";
import AdminDashboard from "@/components/layout/AdminDashboard";
import AllProducts from "@/components/myUI/AllProducts";
import ProductSaleChart from "@/components/myUI/ProductSaleChart";
import { useUserContext } from "@/contexts/UserContextProvider";
import { GET_SALES } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import { Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sale } from "../../../generated/prisma";
import ProductSaleChartHome from "@/components/myUI/ProductSaleChartHome";

export default function Home() {
  const { user } = useUserContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    async function getSales() {
      try {
        const res: {
          sales: Sale[];
        } = await gqlClient.request(GET_SALES);
        if (res.sales) {
          setSales(res.sales);
        } else {
          toast("error while fetching sales");
        }
      } catch (err: any) {
        console.log("err while getting sales data", err.message);
      }
    }
    getSales();
  }, []);

  const chartData =
    sales.map((sale) => {
      const date = new Date(Number(sale.createdAt));
      const format = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      return {
        date: format,
        quantity: sale.quantity,
      };
    }) || [];

  console.log(chartData);
  // Loading state
  // if (loading) {
  //   return (
  //     <main className="flex justify-center items-center min-h-[50vh] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="w-8 h-8 border-2 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
  //         <p className="text-sm opacity-60">Loading...</p>
  //       </div>
  //     </main>
  //   );
  // }

  // Not authenticated state
  // if (!user) {
  //   return (
  //     <main className="flex flex-col items-center justify-center min-h-[50vh] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
  //       <div className="text-center max-w-md">
  //         <div className="mb-6">
  //           <div className="relative w-16 h-16 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
  //             <Image
  //               src={"/storelogo.png"}
  //               fill
  //               alt="logo"
  //               className="rounded-full object-contain"
  //             />
  //           </div>
  //           <h1 className="text-2xl font-light mb-2">Welcome to IMS</h1>
  //           <span className="text-2xl font-light">
  //             Inventory Management System
  //           </span>
  //           <p className="text-sm opacity-70 my-4">
  //             Please sign in to view and manage your products.
  //           </p>
  //         </div>
  //         <Link
  //           href="/login"
  //           className="inline-block rounded-md px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
  //         >
  //           Sign In
  //         </Link>
  //       </div>
  //     </main>
  //   );
  // }

  return (
    <div className="flex flex-col gap-8 min-h-full h-fit">
      <div className="flex min-h-[calc(100vh-64px)] h-fit gap-8 relative  px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Mobile Sidebar Toggle Button - Only for Admins */}
        {user?.role === "admin" && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-15 right-6 z-50 p-3 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:bg-white dark:hover:bg-black transition-colors duration-200"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Users className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Sidebar - AdminDashboard */}
        {user?.role === "admin" && (
          <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar Container */}
            <div
              className={`
            fixed lg:static inset-y-0 right-0 z-40 w-80 
            transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"} 
            lg:translate-x-0 transition-transform duration-300 ease-in-out
            flex-shrink-0 lg:order-2
          `}
            >
              <AdminDashboard />
            </div>
          </>
        )}

        {/* Main Content Area */}
        <main
          className={`
        flex-1 min-w-0 h-fit flex flex-col justify-between
        ${user?.role === "admin" ? " lg:order-1" : ""}
      `}
        >
          <div className="w-full flex flex-col gap-4 h-fit">
            {user?.role === "admin" ? (
              <AllProducts className="grid grid-cols-1 md:grid-cols-2" />
            ) : (
              <AllProducts className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
            )}
            <ProductSaleChartHome chartData={chartData} />
          </div>
        </main>
      </div>
      
    </div>
  );
}
