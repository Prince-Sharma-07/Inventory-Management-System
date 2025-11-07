"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/contexts/UserContextProvider";
import { LOGOUT } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import { Avatar } from "@radix-ui/themes";
import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ProfileDropDown() {
  const { user, setUser } = useUserContext();
  
  async function handleLogout() {
    try {
      const res: {
        logoutUser: boolean;
      } = await gqlClient.request(LOGOUT);
      if (res?.logoutUser) {
        toast.success("Logged out successfully!");
        setUser(null);
        window.location.href = "/";
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error("Something went wrong!");
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-emerald-600 dark:text-emerald-400";
      case "staff":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <>
      {!user?.id ? (
        <div className="flex items-center">
          <Link
            href="/login"
            className="px-4 rounded-md py-2 text-sm font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 border border-black dark:border-white"
          >
            Sign In
          </Link>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20">
              {/* Desktop View */}
              <div className="hidden md:flex items-center gap-3 pr-2">
                <div className="relative inline-block rounded-full">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <Avatar
                      size={"3"}
                      radius="full"
                      fallback={user?.name[0].toUpperCase() || ""}
                    />
                  )}
                </div>

                <div className="text-left">
                  <div className="text-sm font-medium leading-none">
                    {user.name}
                  </div>
                  <div
                    className={`text-xs mt-1 capitalize ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 opacity-60" />
              </div>

              {/* Mobile View */}
              <div className="md:hidden relative inline-block rounded-full">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <Avatar
                      size={"3"}
                      radius="full"
                      fallback={user?.name[0].toUpperCase() || ""}
                    />
                  )}
                </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-lg"
            align="end"
            sideOffset={8}
          >
            {/* User Info Header */}
            <div className="px-3 py-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="relative inline-block rounded-full">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <Avatar
                      size={"3"}
                      radius="full"
                      fallback={user?.name[0].toUpperCase() || ""}
                    />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                  <div
                    className={`text-xs capitalize font-medium mt-1 ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </div>
                </div>
              </div>
            </div>

            <DropdownMenuGroup className="py-1">
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  View Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 font-medium text-sm text-red-400 dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-800 cursor-pointer focus:bg-red-600 dark:focus:bg-red-400"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
