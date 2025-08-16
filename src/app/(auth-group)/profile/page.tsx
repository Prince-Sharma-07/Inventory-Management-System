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

  // const [user, setUser] = useState<UserProfile>({
  //   id: "507f1f77bcf86cd799439011",
  //   name: "Sarah Johnson",
  //   email: "sarah.johnson@company.com",
  //   username: "sarahj",
  //   password: "••••••••••",
  //   avatar: undefined,
  //   role: "staff",
  // });

  const { user, setUser } = useUserContext();
  const [editForm, setEditForm] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(user);
  };

  const handleSave = () => {
    setUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
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
    <div className="bg-white dark:bg-black">
      {/* Header */}
      <div className="dark:bg-black text-white py-2 px-8 border-b ">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light tracking-wide">Profile</h1>
              <p className="text-gray-300 mt-1">
                Manage your account information
              </p>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
              >
                <Edit3 size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors duration-200"
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
            <div className="dark:bg-black border border-gray-200 p-8 text-center">
              <div className="relative inline-block mb-6 rounded-full border-2 border-white">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <Avatar size={"8"} radius="full" fallback="A" />
                )}
                <button className="absolute bottom-0 right-0 bg-white border-2 border-black p-2 rounded-full hover:bg-black hover:text-white transition-colors duration-200">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-2xl font-light mb-2 ">{user?.name}</h2>
              <div
                className={`inline-block px-3 py-1 border text-sm font-medium uppercase tracking-wider ${getRoleBadgeStyle(
                  user?.role
                )}`}
              >
                {user?.role}
              </div>
            </div>

            {/* Account Stats */}
            <div className="mt-6 dark:bg-black border border-gray-200 p-6">
              <h3 className="text-lg font-light mb-4 border-b border-gray-200 pb-2">
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
            <div className="bg-white dark:bg-black border border-gray-200 ">
              <div className="border-b border-gray-200 px-6 py-6">
                <h3 className="text-xl font-light">Personal Information</h3>
              </div>

              <div className="p-6 space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm?.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900">
                      {user?.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm?.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900">
                      {user?.email}
                    </div>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <AtSign size={16} className="inline mr-2" />
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm?.username}
                      onChange={(e) =>
                        setEditForm({ ...editForm, username: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900">
                      @{user?.username}
                    </div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Shield size={16} className="inline mr-2" />
                    Role
                  </label>
                  {isEditing ? (
                    <select
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          role: e.target.value as any,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    >
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 border border-gray-200">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium uppercase tracking-wider border ${getRoleBadgeStyle(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
