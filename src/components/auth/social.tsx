"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Socail = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full gap-x-2 items-center">
      <Button
        onClick={() => onClick("google")}
        size="lg"
        variant="outline"
        className="w-full"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => onClick("github")}
        size="lg"
        variant="outline"
        className="w-full"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
