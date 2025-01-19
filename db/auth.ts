"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import { addUser, getUser, isValidUser } from "./query";
import { createSession, deleteSession } from "@/db/session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await addUser({
    name: name,
    email: email,
    password: hashedPassword,
  });
  const user = data;
  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
  await createSession(email);
  redirect("/profile");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;
  const data = await getUser(email);
  if (!data) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
  console.log(password);
  const passwordMatched = await bcrypt.compare(password, data.password);
  if (!passwordMatched) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
  await createSession(email);
  redirect("/profile");
}

const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  email: string;
  expiresAt: Date;
};
