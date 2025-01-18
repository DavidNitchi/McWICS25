import bcrypt from "bcrypt";
import { z } from "zod";
import { addUser } from "./query";

export async function signup(state: FormState, formData: FormData) {
  console.log("hello1");

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  console.log("2");
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log("3");
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  //const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPassword = "hello";

  console.log("hello");
  // 3. Insert the user into the database or call an Auth Library's API
  const data = await addUser({
    name: name,
    email: email,
    password: hashedPassword,
  });

  console.log(data);
  // const user = data;

  // if (!user) {
  //   return {
  //     message: "An error occurred while creating your account.",
  //   };
  // }
}

export const SignupFormSchema = z.object({
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

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
