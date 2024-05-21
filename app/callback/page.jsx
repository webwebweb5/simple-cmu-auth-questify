"use client";

import { AuthContext } from "@/auth/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page() {
  const { login, user } = useContext(AuthContext);

  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      login(code);
    }
  }, [login, searchParams]);

  useEffect(() => {
    if (user) {
        router.push("/profile")
    }
  }, [router, user]);

  return (
    <main className="flex w-[100vw] h-[100vh] items-center justify-center">
      <div>Loading...</div>
    </main>
  );
}
