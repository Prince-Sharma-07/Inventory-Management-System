"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import gqlClient from "@/lib/services/graphQL";
import { EditIcon } from "lucide-react";
import { useEffect } from "react";
import { RoleType } from "../../../generated/prisma";
import { UPDATE_ROLE } from "@/lib/gql/mutations";
import { toast } from "sonner";

export function EditRoleBtn({
  userId,
  currRole,
  setCurrRole,
}: {
  userId: string;
  currRole: RoleType;
  setCurrRole: (val: RoleType) => void;
}) {
  useEffect(() => {
    async function editRole() {
      try {
        const res: {
          updateUserRole: boolean;
        } = await gqlClient.request(UPDATE_ROLE, {
          userId,
          role: currRole,
        });
        if (res?.updateUserRole) {
          toast("Role updated successfully!");
        } else {
          toast("something went wrong!");
        }
      } catch (err: any) {
        console.log(err.message);
        toast("something went wrong!");
      }
    }
    editRole();
  }, [currRole]);
  return (
    <Select
      value={currRole}
      onValueChange={(val) => setCurrRole(val as RoleType)}
    >
      <SelectTrigger className="border-none outline-none">
        <EditIcon className="cursor-pointer" />
      </SelectTrigger>
      <SelectContent className="font-medium">
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="manager">Manager</SelectItem>
          <SelectItem value="staff">Staff</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
