"use client";
import NavBar from "@/components/navBar";
import { verifySession } from "@/db/dal";
import { useState, useEffect } from "react";
import { getAllUserExperiences, getSkills } from "@/db/query";
import { prompt } from "@/api/geminiAPI";
import exp from "node:constants";

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
  const [email, setEmail] = useState("");
  //Calling verify session to redirect to login
  useEffect(() => {
    // Define an asynchronous function to call the imported function
    const getData = async () => {
      try {
        const result = await verifySession(); // Call the imported function
        setEmail(result.email as string); // Set the variable with the output
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData(); // Call the async function inside useEffect
  }, []);
  const [userExperiences, setUserExperiences] = useState<expType[]>();
  const [userSkills, setUserSkills] = useState<string[]>();

  useEffect(() => {
    // Define an asynchronous function to call the imported function
    const getData = async () => {
      try {
        const result = await verifySession(); // Call the imported function
        //console.log(result, "result");
        //setEmail(result.email as string); // Set the variable with the output
        await getAllUserExperiences(result.email as string).then((response) => {
          if (response) setUserExperiences(response);
          console.log(response);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData(); // Call the async function inside useEffect
  }, []);

  useEffect(() => {
    // Define an asynchronous function to call the imported function
    const getData = async () => {
      try {
        const result = await verifySession(); // Call the imported function
        //setEmail(result.email as string); // Set the variable with the output
        //console.log("calling getSkills")
        await getSkills(result.email as string).then((response) => {
          if (response) setUserSkills(response);
          console.log(response);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData(); // Call the async function inside useEffect
  }, []);
  //console.log(email)
  const formatExperiences = function () {
    let educationFormatted = [];
    let ind = 0;
    for (let educationExp of userExperiences![0]) {
      let clone = (({ id, userId, ...rest }) => rest)(educationExp);
      let indexedClone = { index: ind, ...clone };
      educationFormatted.push(indexedClone);
      ind++;
    }

    let workFormatted = [];
    ind = 0;
    for (let workExp of userExperiences![1]) {
      let clone = (({ id, userId, ...rest }) => rest)(workExp);
      let indexedClone = { index: ind, ...clone };
      workFormatted.push(indexedClone);
      ind++;
    }

    let projectFormatted = [];
    ind = 0;
    for (let projectExp of userExperiences![2]) {
      let clone = (({ id, userId, ...rest }) => rest)(projectExp);
      let indexedClone = { index: ind, ...clone };
      projectFormatted.push(indexedClone);
      ind++;
    }

    let extrasFormatted = [];
    ind = 0;
    for (let extrasExp of userExperiences![3]) {
      let clone = (({ id, userId, ...rest }) => rest)(extrasExp);
      let indexedClone = { index: ind, ...clone };
      extrasFormatted.push(indexedClone);
      ind++;
    }
    //console.log("userSkills:", userSkills);
    return [
      educationFormatted,
      workFormatted,
      projectFormatted,
      extrasFormatted,
      userSkills,
    ];
  };
  const [inputText, setInputText] = useState("");
  const handleGenerateCV = () => {
    //console.log(inputText)
    //console.log(userExperiences)
    let expList = formatExperiences();
    console.log(expList);
    //console.log(userSkills, "user skills");
    
    const returnedCV = prompt(
      inputText,
      `{Education: ${expList[0]}, WorkExperiences: ${expList[1]}, Projects: ${expList[2]}, ExtraCurriculars: ${expList[3]}, Skills:${expList[4]}`
    );
    console.log(returnedCV);
    alert("Generating CV with the following text:\n" + inputText);
    // Add your CV generation logic here
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
            onClick={handleGenerateCV}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Generate CV
          </button>
        </div>
      </div>
    </div>
  );
}
