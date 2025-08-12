"use client";
import { useUserContext } from "@/contexts/UserContextProvider";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  const { user } = useUserContext();

  return (
    <div>
      <header className="h-20 flex justify-between px-8 py-2 items-center sticky top-0 border-b border-gray-50">
        <Link href={'/'} className="relative h-8 w-8"><Image fill src={'/storelogo.png'} alt="logo" /></Link>
        <div> 
          <Box maxWidth="240px" width="200px">
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
        </div>
      </header>
    </div>
  );
}
