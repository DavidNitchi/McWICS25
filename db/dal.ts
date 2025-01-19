import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getUser } from "./query";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.email) {
    redirect("/login");
  }

  return { isAuth: true, email: session.email };
});

export const getUserCache = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await getUser(session.email as string);
    const user = data;
    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
