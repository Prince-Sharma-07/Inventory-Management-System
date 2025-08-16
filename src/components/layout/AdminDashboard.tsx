import React, { useEffect, useState } from "react";
import { AddUserBtn } from "../myUI/AddUserBtn";
import gqlClient from "@/lib/services/graphQL";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import { User } from "../../../generated/prisma";
import UserCard from "../myUI/UserCard";
import { AddProductBtn } from "../myUI/AddProductBtn";
import { UsersIcon } from "lucide-react";

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
    <div className="w-[30%] backdrop-blur-3xl p-4 rounded-2xl min-h-[80vh] h-[80vh] overflow-auto sticky top-16 flex flex-col items-end gap-4 border mt-6 shadow-card">
      <div className="w-full flex flex-row-reverse">
        <AddUserBtn />
      </div>

      <div className="flex flex-col gap-5 w-full">
        <h2 className="flex items-center gap-2"><UsersIcon/> Users</h2>
        <div className="flex flex-col gap-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
        </div>
      </div>
    </div>
  );
}
