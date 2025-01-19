import React from "react";
import MainButton from "./Buttons/mainButton";
import JobsCarousel from "./ui/jobsCarousel";
import { getJson } from "serpapi";
import { data } from "@/db/dummyData";

export default async function Main() {
  //const data = await getSearchResults();
  return (
    <ul className="space-y-4 justify-center items-center flex flex-col min-h-screen">
      <MainButton text="Profile" link="/profile" />
      <MainButton text="CV Creation" link="/cvCreation" />
      <div className="w-9/12 font-bold text-2xl font-mono">Today's Jobs</div>
      <JobsCarousel data={data} />
    </ul>
  );
}

const getSearchResults = async () => {
  const searchParams = {
    q: "Developer careers",
    location: "montreal",
    num: 15,
    api_key: process.env.SERPAPI_SECRET,
    engine: "google",
  };
  try {
    const response = await getJson(searchParams);
    const data = response;
    // Extract titles and descriptions from organic results
    const results = data.organic_results
      .slice(0, 15)
      .map((result: { title: any; snippet: any; link: any }) => ({
        title: result.title,
        description: result.snippet,
        link: result.link,
      }));
    return results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
