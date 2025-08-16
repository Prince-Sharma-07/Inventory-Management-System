// import React, { useEffect, useState } from "react";
// import { AddUserBtn } from "../myUI/AddUserBtn";
// import gqlClient from "@/lib/services/graphQL";
// import { GET_ALL_USERS } from "@/lib/gql/queries";
// import { User } from "../../../generated/prisma";
// import UserCard from "../myUI/UserCard";
// import { AddProductBtn } from "../myUI/AddProductBtn";
// import { UsersIcon } from "lucide-react";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     async function getUsers() {
//       const data: {
//         AllUsers: User[];
//       } = await gqlClient.request(GET_ALL_USERS);
//       setUsers(data.AllUsers || []);
//     }
//     getUsers();
//   }, []);

//   return (
//     <div className="w-[30%] backdrop-blur-3xl p-4 rounded-2xl min-h-[80vh] h-[80vh] overflow-auto sticky top-16 flex flex-col items-end gap-4 border mt-6 shadow-card">
//       <div className="w-full flex flex-row-reverse">
//         <AddUserBtn />
//       </div>

//       <div className="flex flex-col gap-5 w-full">
//         <h2 className="flex items-center gap-2"><UsersIcon/> Users</h2>
//         <div className="flex flex-col gap-3">
//         {users.map((user) => (
//           <UserCard key={user.id} user={user} />
//         ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { AddUserBtn } from "../myUI/AddUserBtn";
import gqlClient from "@/lib/services/graphQL";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import { User } from "../../../generated/prisma";
import UserCard from "../myUI/UserCard";
import { UsersIcon, Loader2, AlertCircle, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: {
        AllUsers: User[];
      } = await gqlClient.request(GET_ALL_USERS);
      setUsers(data.AllUsers || []);
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const userStats = {
    total: users.length,
    managers: users.filter(user => user.role === 'manager').length,
    staff: users.filter(user => user.role === 'staff').length,
  };

  return (
    <aside className="w-80 backdrop-blur-xl bg-white/90 dark:bg-black/90 p-3 sm:p-4 lg:p-5 xl:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-97px)] max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] overflow-hidden sticky top-18 flex flex-col border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-200 mt-4">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
            <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100">
              Users
            </h2>
            <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              Manage users
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <AddUserBtn setUsers={setUsers}/>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-2 lg:gap-3 mb-3 sm:mb-4 lg:mb-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 lg:p-3 text-center">
          <div className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">
            {userStats.total}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-2 lg:p-3 text-center">
          <div className="text-sm sm:text-lg lg:text-xl font-bold text-purple-600 dark:text-purple-400">
            {userStats.managers}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">Managers</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2 lg:p-3 text-center">
          <div className="text-sm sm:text-lg lg:text-xl font-bold text-blue-600 dark:text-blue-400">
            {userStats.staff}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">Staff</div>
        </div>
      </div>

      {/* Users List Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Users ({users.length})
          </h3>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 pr-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-6 sm:py-8 space-y-2 sm:space-y-3">
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-gray-400" />
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Loading users...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-6 sm:py-8 space-y-2 sm:space-y-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
              <button
                onClick={fetchUsers}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 sm:py-8 space-y-2 sm:space-y-3">
              <UsersIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 dark:text-gray-600" />
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                No users found
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                Add the first user 
              </p>
            </div>
          ) : (
            users.map((user) => (
              <UserCard key={user.id} user={user} setUsers = {setUsers}/>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}