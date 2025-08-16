"use client";
import { DELETE_USER } from "@/lib/gql/mutations";
import gqlClient from "@/lib/services/graphQL";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { User } from "../../../generated/prisma";

export default function DeleteUserBtn({
  id,
  setUsers,
}: {
  id: string;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) {
  async function handleDeleteUser() {
    try {
      const res: {
        deleted: boolean;
      } = await gqlClient.request(DELETE_USER, { id });
      if (res.deleted) { 
        toast("User deleted successfully!");
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        toast("Something went wrong!");
      }
    } catch (err: any) {
      console.log("error while deleting user! ", err.message);
      toast("Something went wrong!");
    }
  }

  return (
    <button
      onClick={handleDeleteUser}
      className="flex items-center cursor-pointer"
    >
      <Trash className="h-6 w-6 hover:text-gray-400 mb-[1px]" />
    </button>
  );
}
