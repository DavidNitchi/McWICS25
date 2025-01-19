import { verifySession } from "@/db/dal";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await verifySession(); // Assuming 'role' is part of the session object

  if (session) {
    return <div>hello</div>;
  } else {
    redirect("/login");
  }
}
