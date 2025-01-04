"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const Socail = () => {
  return (
    <div className="flex w-full gap-x-2 items-center">
      <Button onClick={() => {}} size="lg" variant="outline" className="w-full">
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button onClick={() => {}} size="lg" variant="outline" className="w-full">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
