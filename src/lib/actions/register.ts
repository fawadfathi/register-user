"use server";

import * as z from "zod";
import db from "@/lib/db";
import { registerSchema } from "@/components/auth/register-form";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  await db.user.create({
    data: {
      name: values.name,
      email: values.email,
      password: values.password,
    },
  });
};
