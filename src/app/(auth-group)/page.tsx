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
import { useUserContext } from "@/contexts/UserContextProvider";
import { Users, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { user, loading } = useUserContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Loading state
  if (loading) {
    return (
      <main className="flex justify-center items-center min-h-[50vh] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm opacity-60">Loading...</p>
        </div>
      </main>
    );
  }

  // Not authenticated state
  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[50vh] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-light mb-2">Welcome to IMS</h1>
            <span className="text-2xl font-light">
              Inventory Management System
            </span>
            <p className="text-sm opacity-70 my-4">
              Please sign in to view and manage your products.
            </p>
          </div>
          <a
            href="/login"
            className="inline-block rounded-md px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Sign In
          </a>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen gap-8 relative  px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
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
        flex-1 min-w-0
        ${user?.role === "admin" ? " lg:order-1" : ""}
      `}
      >
        <div className="w-full">
          {user?.role === "admin" ? (
            <AllProducts className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" />
          ) : (
            <AllProducts className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" />
          )}
        </div>
      </main>
    </div>
  );
}
