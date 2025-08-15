"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gql } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SIGN_UP = gql`
  mutation Mutation($name: String!, $email: String!, $password: String!) {
    signUpUser(name: $name, email: $email, password: $password) {
      message
      success
    }
  }
`;
export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    message?: string;
  }>({});

  async function handleSignUp() {
    setLoading(true);
    setError({});
    try {
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="w-full flex items-center gap-5 justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>SignUp to your account</CardTitle>
              <CardDescription>
                Enter your details below to create your new account
              </CardDescription>
            </div>
            <div className="relative h-16 min-w-16 rounded-full">
              <Image fill src={"/storelogo.png"} alt="Store_logo" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="eg. prince"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="eg. prince_07"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="atleast 8 characters"
                  required
                />
              </div>
            </div>
          </form>
          <CardAction>
            <div className="text-sm mt-2 flex gap-1">
              Already a user?
              <Link href={"/login"} className="hover:underline">
                Login
              </Link>
            </div>
          </CardAction>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={loading}
            onClick={handleSignUp}
            className="w-full cursor-pointer"
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
