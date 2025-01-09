"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/lib/actions/new-verification";

import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const serachParams = useSearchParams();
  const token = serachParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center mb-4 text-3xl">
          🔐AUTH
        </CardTitle>
        Confirming your verification
      </CardHeader>
      <CardContent>
        <div className="flex items-center w-full justify-center">
          {!success && !error && <BeatLoader />}
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="font-normal w-full" asChild size="sm" variant="link">
          <Link href="/auth/login">Back to login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
