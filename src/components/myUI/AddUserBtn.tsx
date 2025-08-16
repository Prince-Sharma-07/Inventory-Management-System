import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CREATE_USER } from "@/lib/gql/mutations";
import gqlClient from "@/lib/services/graphQL";
import { Plus, PlusIcon, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { User } from "../../../generated/prisma";
import { toast } from "sonner";

export function AddUserBtn() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState("staff");

  function clearFields() {
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("staff");
  }

  async function handleAddUser() {
    try {
      const res: {
        createdUser: User;
      } = await gqlClient.request(CREATE_USER, {
        name,
        username,
        email,
        password,
        role,
      });
      if (res?.createdUser?.id) {
        toast("User Created Successfully!");
        clearFields();
      } else {
        toast("User creation aborted!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white font-medium rounded cursor-pointer">
            <UserRoundPlus/>
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-50">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Add details of the new user. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-1">Email</Label>
              <Input
                id="email-1"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password-1">Password</Label>
              <Input
                id="password-1"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="role-1">Select Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role-1" className="w-full">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleAddUser}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
