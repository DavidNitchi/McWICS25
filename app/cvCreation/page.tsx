"use client";
import NavBar from "@/components/navBar";
import { verifySession } from "@/db/dal";
import { useState, useEffect, use } from "react";
import { getAllUserExperiences, getSkills } from "@/db/query";
import { prompt } from "@/api/geminiAPI";

import Component from '@/components/reactToPDF'


//import CVAPI from "@/api/cvAPI";
import { fit } from "@/api/greedyAlg";

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

export default function Home() {
  const [email, setEmail] = useState("m@gmail.com");
  const [genCV, setGenCV] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const [userExperiences, setUserExperiences] = useState<expType[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);

  const [responseState, setResponseState] = useState<{
    users: { name: string; email: string; password: string; skills: unknown }[] | undefined;
    education: any[];
    workExperience: any[];
    project: any[];
    extraCurricular: any[];
  } | null>(null);

  function greedyAlg(inputText: string) {
    throw new Error("Function not implemented.");
  }

  // Calling verify session to redirect to login
  // useEffect(() => {
  //   // Define an asynchronous function to call the imported function
  //   const getData = async () => {
  //     try {
  //       const result = await verifySession(); // Call the imported function
  //       setEmail(result.email as string); // Set the variable with the output
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   getData();
  // }),
  //   [];

  // const [format, setFormat] = useState<any[][] | null>(null);
  // const [reply, setReply] = useState<string | null>(null);
  // const [data, setData] = useState<any>(null);
  // const [buttonClick, setClick] = useState(true);
  // console.log(data);
  // const formatExperiences = function () {
  //   console.log("data in format exp:", data);
  //   let educationFormatted = [];
  //   let ind = 0;
  //   if (data[0].length > 0) {
  //     for (let educationExp of data![0]) {
  //       let clone = (({ id, userId, ...rest }) => rest)(educationExp);
  //       let indexedClone = { index: ind, ...clone };
  //       educationFormatted.push(indexedClone);
  //       ind++;
  //     }
  //   }

  //   let workFormatted = [];
  //   ind = 0;
  //   if (data[1].length > 0) {
  //     for (let workExp of data![1]) {
  //       let clone = (({ id, userId, ...rest }) => rest)(workExp);
  //       let indexedClone = { index: ind, ...clone };
  //       workFormatted.push(indexedClone);
  //       ind++;
  //     }
  //   }

  //   let projectFormatted = [];
  //   ind = 0;
  //   if (data[2].length > 0) {
  //     for (let projectExp of data![2]) {
  //       let clone = (({ id, userId, ...rest }) => rest)(projectExp);
  //       let indexedClone = { index: ind, ...clone };
  //       projectFormatted.push(indexedClone);
  //       ind++;
  //     }
  //   }

  //   let extrasFormatted = [];
  //   ind = 0;
  //   if (data[3].length > 0) {
  //     for (let extrasExp of data![3]) {
  //       let clone = (({ id, userId, ...rest }) => rest)(extrasExp);
  //       let indexedClone = { index: ind, ...clone };
  //       extrasFormatted.push(indexedClone);
  //       ind++;
  //     }
  //   }
  //   return [
  //     educationFormatted,
  //     workFormatted,
  //     projectFormatted,
  //     extrasFormatted,
  //   ];
  // };
  // useEffect(() => {
  //   const fetchAll = async () => {
  //     if (email != "") {
  //       const response = await getAllUserExperiences(email);
  //       console.log(response);
  //       if (response) setData(response);
  //     }
  //   };
  //   fetchAll();
  // }, []);

  // useEffect(() => {
  //   console.log("in the fetch call");
  //   const fetchData = async () => {
  //     for (let i = 0; i < 4; i++) {
  //       if (format) {
  //         const response = await prompt(inputText, format[i]);
  //         setReply(response);
  //       }
  //     }
  //     setFormat(formatExperiences());
  //     console.log("format:", format);
  //     fetchData();
  //   };
  // }, [buttonClick]);
  // console.log(buttonClick);

  const formatExperiences = (userExperiences: expType[]) => {
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

  return (
    <div className="">
      <NavBar />
      <div className="flex-col w-3/4 h-screen mx-auto mt-16 text-center font-sans">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">CV Generator</h1>
        <textarea
          className="w-2/3 h-1/2 p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-6 resize-none"
          placeholder="Enter your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div>
          <button
            onClick={async () => {
              const response = await fit(inputText);
              console.log(response); setGenCV(true);
              setResponseState(response);

              // formatExperiences(responseState)
              // const trimmedData = {
              //   users: [
              //     {
              //       name: name,
              //       email: email,
              //       skills: userSkills ? userSkills : null,
              //     },
              //   ],
              //   education: formatExperiences()[0].length > 0 ? formatExperiences()[0] : null,
              //   workExperience: formatExperiences()[1].length > 0 ? formatExperiences()[1] : null,
              //   project: formatExperiences()[2].length > 0 ? formatExperiences()[2] : null,
              //   extraCurricular: formatExperiences()[3].length > 0 ? formatExperiences()[3] : null,
              // }
            }}
            
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Generate CV
          </button>
          <div className="w-2/3 text-center flex-col h-full mx-auto mb-10 mt-10">
            {genCV && responseState && <Component trimmed={{ ...responseState, users: responseState.users ? [responseState.users] : [] }} />}
          </div>
        </div>
      </div>
    </div>
  );
}
