"use client";

import { useState, useTransition } from "react";

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Socail } from "@/components/auth/social";
import { register } from "@/lib/actions/register";
import { registerFormSchema } from "@/schema";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<true | false>(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPendding, startTransation] = useTransition();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    setSuccess("");
    setError("");

    startTransation(() => {
      register(values).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="items-center">
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Create an Account!</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPendding}
                        placeholder="Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="name@example.com"
                        disabled={isPendding}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          disabled={isPendding}
                          type={showPassword ? "text" : "password"}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-gray-500">
                      Your password must be at least 8 characters long and
                      include a number and a special character.
                    </p>
                  </FormItem>
                )}
              />
            </div>

            {/* TODO: create a component to handle error and success messages */}
            <div className="text-xs text-green-600">{success && success}</div>
            <div className="text-xs text-red-600">{error && error}</div>

            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex-col space-y-4">
        <Socail />
        <Button variant="link" size="sm" asChild className="w-full font-normal">
          <Link href="/auth/login" className="text-xs">
            already have an account
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
