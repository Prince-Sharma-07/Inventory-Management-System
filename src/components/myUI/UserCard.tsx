'use client'
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { User } from "../../../generated/prisma";
import { EditRoleBtn } from "./EditRoleBtn";
import { useState } from "react";

export default function UserCard({ user }: { user: User }) {
  const [currRole, setCurrRole] = useState(user?.role);
  return (
    <div className="w-full flex flex-col gap-2 items-end">
      <Box maxWidth="300px" className="w-full">
        <Card>
          <Flex gap="3" align="center" justify="between">
            <Box>
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
                {currRole}
              </Text>
              </Box>
              </Flex>
            </Box>
            
            <EditRoleBtn userId = {user.id} currRole={currRole} setCurrRole={setCurrRole} />
          </Flex>
        </Card>
      </Box>
    </div>
  );
}
