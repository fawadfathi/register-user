import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex justify-center items-center">
      <div className="w-[650px] flex flex-col justify-center items-center space-y-5">
        <h1 className="text-5xl">🔐Auth</h1>
        <p className="text-lg text-center">
          Create an account or sign in to access exclusive features and a
          seamless experience.
        </p>
        <Button>
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    </main>
  );
}
