"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/navBar";
import MainButton from "@/components/Buttons/mainButton";
import JobsCarousel from "@/components/ui/jobsCarousel";
import { getAllUserExperiences, getSkills } from "@/db/query";
import { verifySession } from "@/db/dal";
import { prompt } from "@/api/geminiAPI";
import { data } from "@/db/dummyData"; // Dummy data for jobs carousel

export type expType =
  | {
      id: string;
      school: string;
      degree_type: string;
      major: string;
      start_date: string | null;
      end_date: string | null;
      userId: string;
    }[]
  | {
      description: string;
      id: string;
      title: string;
      userId: string;
    }[];

export default function CVCreationPage() {
  const [email, setEmail] = useState("");
  const [userExperiences, setUserExperiences] = useState<expType[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");

  // Fetch session and user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await verifySession();
        setEmail(result.email);

        const experiences = await getAllUserExperiences(result.email);
        const skills = await getSkills(result.email);

        setUserExperiences(experiences || []);
        setUserSkills(skills || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatExperiences = () => {
    const formatSection = (section: any[]) =>
      section.map((item, index) => ({
        index,
        ...((({ id, userId, ...rest }) => rest)(item)),
      }));

    return [
      formatSection(userExperiences[0] || []),
      formatSection(userExperiences[1] || []),
      formatSection(userExperiences[2] || []),
      formatSection(userExperiences[3] || []),
      userSkills,
    ];
  };

  const handleGenerateCV = () => {
    const formattedData = formatExperiences();
    const cvContent = prompt(
      inputText,
      `{Education: ${JSON.stringify(
        formattedData[0]
      )}, WorkExperiences: ${JSON.stringify(
        formattedData[1]
      )}, Projects: ${JSON.stringify(
        formattedData[2]
      )}, ExtraCurriculars: ${JSON.stringify(
        formattedData[3]
      )}, Skills: ${JSON.stringify(formattedData[4])}}`
    );
    console.log(cvContent);
    alert("Generating CV with the provided details.");
  };

  return (
    <div>
      <NavBar />
      <div className="flex-col w-full h-full mx-auto mt-16 text-center font-sans">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">CV Generator</h1>
        <textarea
          className="w-2/3 h-3/4 p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-6 resize-none"
          placeholder="Enter your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div>
          <button
            onClick={handleGenerateCV}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md mb-16"
          >
            Generate CV
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4 mt-5">
            <div className="w-9/12 font-bold text-2xl font-mono">Today's Jobs</div>
            <JobsCarousel data={data} />
      </div>
      </div>
      
    </div>
  );
}
