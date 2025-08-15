"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/contexts/UserContextProvider";
import { LOGOUT } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function ProfileDropDown() {
  const { user, setUser } = useUserContext();

  async function handleLogout() {
    try {
      const res: {
        logoutUser: boolean;
      } = await gqlClient.request(LOGOUT);
      if (res?.logoutUser) {
        toast("User logged out successfully!");
        setUser(null);
        window.location.href = '/'
      } else {
        toast("something went wrong!");
      }
    } catch (err: any) {
      console.log(err.message);
      toast("something went wrong!");
    }
  }

  return (
    <>
      {!user?.id ? (
        <div className="flex gap-4 items-center font-medium">
          <Link href={"/login"}>Login</Link>
          <Button className="font-bold">
            <Link href={"/signup"} className="font-medium">Register</Link>
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Box
              maxWidth="240px"
              width="200px"
              className="border-1 border-white rounded-md"
            >
              <Card>
                <Flex gap="3" align="center">
                  <Avatar
                    size={"3"}
                    radius="full"
                    fallback={user?.name[0].toUpperCase() || ""}
                  />
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      {user?.name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {user?.role}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-50 bg-[#18191B] text-white border font-medium"
            align="start"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className="flex gap-2 items-center w-full" href={'/profile'}><UserIcon className="dark:text-white" /> Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon className="dark:text-white" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
