"use client";

import { AuthContext } from "@/auth/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const { user, logout } = useContext(AuthContext);

  const router = useRouter();

  return (
    <main className="flex w-[100vw] h-[100vh] items-center justify-center">
      {user ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Name</strong>: {user.cmuitaccount_name}</p>
              <p><strong>Email</strong>: {user.cmuitaccount}</p>
              <p><strong>First name</strong>: {user.firstname_EN}</p>
              <p><strong>Last name</strong>: {user.lastname_EN}</p>
              <p><strong>Organization</strong>: {user.organization_name_EN}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="default"
              className="w-full"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button onClick={() => router.push("/")}>Back to Login</Button>
      )}
    </main>
  );
}
