import React, { useEffect, useState } from "react";
import { AddUserBtn } from "../myUI/AddUserBtn";
import gqlClient from "@/lib/services/graphQL";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import { User } from "../../../generated/prisma";
import UserCard from "../myUI/UserCard";
import { AddProductBtn } from "../myUI/AddProductBtn";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const data: {
        AllUsers: User[];
      } = await gqlClient.request(GET_ALL_USERS);
      setUsers(data.AllUsers || []);
    }
    getUsers();
  }, []);

  return (
    
      <div className="w-96 backdrop-blur-3xl p-4 rounded-2xl min-h-[80vh] flex flex-col items-end gap-4">
        <AddUserBtn />
        <AddProductBtn />
        <div className="flex flex-col gap-2 w-full">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
   
  );
}
