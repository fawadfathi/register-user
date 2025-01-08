"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { registerFormSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "./tokens";
import { SendVerificationEmail } from "../mail";

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

  const verificationToken = await generateVerificationToken(email);
  await SendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email sent!" };
};
