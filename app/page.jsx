"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_CMU_OAUTH_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const authorizationUrl = `https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=cmuitaccount.basicinfo`;
    router.push(authorizationUrl);
  };

  return (
    <main className="flex w-[100vw] h-[100vh] items-center justify-center">
      <div>
        <Button variants="default" onClick={handleLogin}>Login CMU</Button>
      </div>
    </main>
  );
}
