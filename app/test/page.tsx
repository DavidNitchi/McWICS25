"use server";

import DenisTest from "@/components/test-denis";
import { Button } from "@/components/ui/button";
import { logout } from "@/db/auth";
import { verifySession } from "@/db/dal";
import { redirect } from "next/navigation";
const { getJson } = require("serpapi");

const getSearchResults = async () => {
  const searchParams = {
    q: "Developer careers",
    location: "montreal",
    num: 10,
    api_key: process.env.SERPAPI_SECRET,
    engine: "google",
  };
  try {
    const response = await getJson(searchParams);
    const data = response
    // Extract titles and descriptions from organic results
    const results = data.organic_results
      .slice(0, 10)
      .map((result: { title: any; snippet: any; link: any}) => ({
        title: result.title,
        description: result.snippet,
        link: result.link
      }));
    return results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export default async function Dashboard() {
  //const data = await getSearchResults();
  //console.log(data);

  return <DenisTest />;
}
