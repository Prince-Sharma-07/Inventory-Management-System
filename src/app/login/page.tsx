"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LOGIN } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [userCred, setUserCred] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    message?: string;
  }>({});
  const router = useRouter()

  async function handleLogin() {
    setLoading(true);
    setError({})
    try {
      const res: {
        loginUser: boolean;
      } = await gqlClient.request(LOGIN, { userCred, password });
      if (res?.loginUser) {
        toast("User Logged in Successfully! redirecting..."); 
        setUserCred("")
        setPassword("")
        setTimeout(()=>{
          router.push('/')
          router.refresh();
        }, 1000); 
      } else {
        setError({ message: "Invalid Credentials" });
        toast("Invalid Credentials");
      }
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm dark:bg-black">
        <CardHeader>
          <div className="w-full flex items-center gap-5 justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your username or email below to login to your account
              </CardDescription>
              <CardDescription>
                For Guest login!<br/> 
                Email: admin07@ims.com<br/>
                Password: Admin@123
              </CardDescription>
            </div>
            <div className="relative h-16 min-w-16 rounded-full">
              <Image fill src={"/storelogo.png"} alt="Store_logo" />
            </div>
          </div>
          {error ? (
            <div className="text-red-400 mt-1 text-center w-full">
              {error.message}
            </div>
          ) : (
            ""
          )}
        </CardHeader>
        
        <CardContent>
          
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="userCred">Username or Email</Label>
                <Input
                  id="userCred"
                  type="userCred"
                  value={userCred}
                  onChange={(e) => setUserCred(e.target.value)}
                  placeholder="Enter username or email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button disabled={loading} onClick={handleLogin} className="w-full cursor-pointer">
            {loading ? <span className="loading loading-dots loading-sm"></span> : <>Login</>}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
