"use server";

import NavBar from "@/components/navBar";
import User from "@/components/profile";

export default async function Home() {
  return (
    <div className="">
      <NavBar />
      <User />
    </div>
  );
}
