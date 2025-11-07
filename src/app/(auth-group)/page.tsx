"use client";
import AdminDashboard from "@/components/layout/AdminDashboard";
import AllProducts from "@/components/myUI/AllProducts";
import ProductSaleChartHome from "@/components/myUI/ProductSaleChartHome";
import { useUserContext } from "@/contexts/UserContextProvider";
import { GET_SALES } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import { Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sale } from "../../../generated/prisma";

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

  return (
    <div className="flex flex-col gap-8 min-h-full h-fit">
      <div className="flex min-h-[calc(100vh-64px)] h-fit gap-8 relative  px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
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

        {user?.role === "admin" && (
          <>
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setSidebarOpen(false)}
              />
            )}

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
