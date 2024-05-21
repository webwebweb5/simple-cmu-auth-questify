"use client";

import { AuthContext } from "@/auth/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect } from "react";

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
      router.push("/profile");
    }
  }, [router, user]);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div>loading...</div>
    </Suspense>
  );
}
