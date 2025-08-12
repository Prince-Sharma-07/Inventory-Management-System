import React from "react";
import { User } from "../../../generated/prisma";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="w-full flex flex-col gap-2 items-end">
      <Box maxWidth="240px" className="w-full">
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
  );
}
