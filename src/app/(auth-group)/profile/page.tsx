"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  AtSign,
  Shield,
  Camera,
  Edit3,
  Save,
  X,
} from "lucide-react";
import { Avatar } from "@radix-ui/themes";
import gqlClient from "@/lib/services/graphQL";
import { useUserContext } from "@/contexts/UserContextProvider";
import EditAvatarBtn from "@/components/myUI/EditAvatarBtn";
import { UPDATE_USER } from "@/lib/gql/mutations";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  role: "staff" | "admin" | "user";
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const { user, setUser } = useUserContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.username);
  const [avatar, setAvatar] = useState(user?.avatar);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedUser = {
      userId: user?.id,
      name: name,
      username: username,
      email: email,
      avatar: avatar,
    };
    try {
      const res: {
        updated: boolean;
      } = await gqlClient.request(UPDATE_USER, updatedUser);
      console.log(res)
      if (res?.updated) {
        toast("profile updated successfully!");
      } else {
        toast("Something went wrong!");
      }
    } catch (err: any) {
      console.log("error while updating user", err.message);
      toast("Something went wrong!");
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUsername(user?.username);
    setName(user?.name);
    setEmail(user?.email);
    setAvatar(user?.avatar);
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-black text-white border-black";
      case "staff":
        return "bg-white text-black border-black";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className="w-full pb-6">
      {/* Header */}
      <div className="py-2 px-8 border-b w-full justify-center flex">
        <div className="max-w-212  flex justify-between w-full">
          <div className="w-full flex items-center">
            <div className="w-full justify-center items-center">
              <h1 className="text-2xl md:text-3xl font-light tracking-wide">Profile</h1>
              <p className=" mt-1 max-md:hidden">Manage your account information</p>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex rounded-md text-nowrap items-center gap-2 md:gap-3 px-2 py-1 lg:px-4 lg:py-2 border-2 border-black hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors duration-200 cursor-pointer"
              >
                <Edit3 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex rounded-md items-center gap-2 px-4 py-2 border-1 border-white bg-white text-black hover:text-white hover:bg-black transition-colors duration-200 cursor-pointer"
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex rounded-md cursor-pointer items-center gap-2 px-4 py-2 border-1 border-white bg-white text-black hover:text-white hover:bg-black  transition-colors duration-200"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto pt-5 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar Section */}
          <div className="lg:col-span-1">
            <div className="dark:bg-black border rounded-md border-gray-200 p-8 text-center">
              <div className="relative inline-block mb-6 rounded-full border-2 border-white">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <Avatar
                    size={"8"}
                    radius="full"
                    fallback={user?.name[0].toUpperCase() || ""}
                  />
                )}
                <EditAvatarBtn avatar={avatar} setAvatar={setAvatar} id={user?.id || ""}/>
              </div>
              <h2 className="text-2xl font-light mb-2 ">{user?.name}</h2>
              <div
                className={`inline-block px-3 py-1 border text-sm font-medium uppercase tracking-wider ${getRoleBadgeStyle(
                  user?.role || ""
                )}`}
              >
                {user?.role}
              </div>
            </div>

            {/* Account Stats */}
            <div className="mt-6 dark:bg-black border border-gray-200 p-6 rounded-md">
              <h3 className="text-lg font-light mb-4 border-b border-gray-200 pb-2 ">
                Account Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">User ID</span>
                  <span className="font-mono">{user?.id.slice(-8)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Account Type</span>
                  <span className="capitalize">{user?.role}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Status</span>
                  <span className="text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-black border border-gray-200 rounded-md">
              <div className="border-b border-gray-200 px-6 py-6">
                <h3 className="text-xl font-light">Personal Information</h3>
              </div>

              <div className="p-6 space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User size={16} className="inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md px-4 py-3 border bg-gray-100 text-gray-950 border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="px-4 rounded-md py-3 border border-gray-200">
                      {name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 rounded-md bg-gray-100 text-gray-950 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-md border border-gray-200">
                      {email}
                    </div>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <AtSign size={16} className="inline mr-2" />
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 rounded-md bg-gray-100 text-gray-950 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 rounded-md border border-gray-200 ">
                      @{username}
                    </div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Shield size={16} className="inline mr-2" />
                    Role
                  </label>

                  <div className="px-4 py-3 border rounded-md border-gray-200">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium uppercase tracking-wider border ${getRoleBadgeStyle(
                        user?.role || ""
                      )}`}
                    >
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
