"use server"

import { verifySession } from "@/db/dal";
import { getAllUserExperiences } from "@/db/query";
import {prompt} from "./geminiAPI";
export default async function CVAPI(jobDescription: string){
  const email = await verifySession();
  const userExps = await getAllUserExperiences(email.email as string);
  const formatExperiences = function () {
    console.log("userExps in format exp:", userExps)
    let educationFormatted = [];
    let ind = 0;
    if (userExps[0].length > 0) {
      for (let educationExp of userExps![0]) {
        let clone = (({ id, userId, ...rest }) => rest)(educationExp);
        let indexedClone = { index: ind, ...clone };
        educationFormatted.push(indexedClone);
        ind++;
      }
    }

    let workFormatted = [];
    ind = 0;
    if (userExps[1].length > 0) {
      for (let workExp of userExps![1]) {
        let clone = (({ id, userId, ...rest }) => rest)(workExp);
        let indexedClone = { index: ind, ...clone };
        workFormatted.push(indexedClone);
        ind++;
      }
    }

    let projectFormatted = [];
    ind = 0;
    if (userExps[2].length > 0) {
      for (let projectExp of userExps![2]) {
        let clone = (({ id, userId, ...rest }) => rest)(projectExp);
        let indexedClone = { index: ind, ...clone };
        projectFormatted.push(indexedClone);
        ind++;
      }
    }

    let extrasFormatted = [];
    ind = 0;
    if (userExps[3].length > 0) {
      for (let extrasExp of userExps![3]) {
        let clone = (({ id, userId, ...rest }) => rest)(extrasExp);
        let indexedClone = { index: ind, ...clone };
        extrasFormatted.push(indexedClone);
        ind++;
      }
    }
    return [
      educationFormatted,
      workFormatted,
      projectFormatted,
      extrasFormatted,
    ];
  };
  const formattedExperiences = formatExperiences();
  let responses = []
  for (let i =0 ; i<4 ; i++){
        if (formattedExperiences[i].length > 0) {
          const response = await prompt(jobDescription, JSON.stringify(formattedExperiences[i]));
          responses.push(response);
        }
        else{
          responses.push("")
        }
      }
  return responses
}