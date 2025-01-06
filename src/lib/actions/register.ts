"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { registerFormSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof registerFormSchema>) => {
  const validatedFields = registerFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User Registered!" };
};
