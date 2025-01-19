"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { logout } from "@/db/auth";
import CarouselCard from "./carouselCard";

export default function DenisTest() {
  const [testText, setTestText] = useState();

  return (
    <CarouselCard />
  );
}
