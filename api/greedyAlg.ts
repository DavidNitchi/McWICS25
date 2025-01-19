import { getAllUserExperiences, getEducation, getExtracurricular, getProject, getworkExperience } from "@/db/query";
import CVAPI from "./cvAPI";
import { verifySession } from "@/db/dal";

type NumberEntry = {
  key: number;
  value: number;
  index: number;
};


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

export async function fit(jobDescription:string) {
  const email = await verifySession();
  //console.log(email);
  email.email = "m@gmail.com"
  const userExps: expType[] = await getAllUserExperiences(email.email as string);
  //console.log("user exps:", userExps);
  const responses = await CVAPI(jobDescription, userExps);
  const mail = email.email as string;
  const individualExps = [await getEducation(mail),await getworkExperience(mail), await getProject(mail), await getExtracurricular(mail) ]
  const scoreData = new Map<number, number[]>();

  scoreData.set(0, [0.8, 0.6, 0.7, 0.9, 0.5]);
  scoreData.set(1, [0.9, 0.3, 0.9, 0.8, 0.7]);
  scoreData.set(2, [0.8, 0.7, 0.6, 0.9, 0.3]);
  scoreData.set(3, [0.9, 0.8, 0.9, 0.7, 0.8]);
  var lengthLeft = 1305 - 163;
  const sectionTitle = 199 - 163;
  const experienceHeader = 221 - 199;
  const bulletPoint = 239 - 229;
  const maxChars = 76;
  //userInfo = {}
  // let ECASection = false;
  // let projSection = false;
  // let expSection = false;
  // let eduSection = false;
  // let result = { Education: [], Experience: [], Projects: [], ECA: [] };

  //console.log("STARTING");
  //console.log("scoreData:", scoreData);
  // create a new array to store all the values in descending order
  // create a new array to store all the values in descending order
  let results : NumberEntry[] = [];

for (const [key, values] of scoreData) {
  values.forEach((value, index) => {
    results.push({ key, value, index });
  });
}

// Sort the list in descending order of the value
  results.sort((a, b) => b.value - a.value);

  //console.log(results);
  // sort the values in descending order
  //allValues.sort((a, b) => b.maxValue - a.maxValue);
  //console.log("All Values:", allValues);
  //allValues = results
  let skills_len = 0;
  let desc_len = 0
  let kept_vals = [];
  let used_categories: number[] = [];
  let addLength = 0;
  let totalLen = 0;
  for (let entry of results) {
    skills_len = 0;
    desc_len = 0
    addLength = 0;
    let catNum = entry.key;
    let expscoreData = individualExps[catNum][entry.index];
    console.log("exp score data", expscoreData);
    //if ("skills_used" in expscoreData){
     // skills_len = expscoreData.skills_used? bulletPoint : 0;    
    //}
    if (!expscoreData){
      continue
    }
    if ("description" in expscoreData){
      desc_len = expscoreData.description ? Math.ceil(expscoreData.description.length / maxChars) * bulletPoint: 0;
    }
    if (used_categories.includes(catNum)) {
      totalLen = skills_len + desc_len + experienceHeader;
    } else {
      totalLen = skills_len + desc_len + experienceHeader + sectionTitle;
    }
    console.log(totalLen);
    console.log(lengthLeft);
    if (lengthLeft - totalLen > 0) {
      kept_vals.push(entry);
      used_categories.push(catNum);
      lengthLeft = lengthLeft-totalLen;
    }
  }
  console.log("kept values", kept_vals);
  let onCV : expType[] = []
  for (let val of kept_vals){
    onCV.push(userExps[val.key][val.index]);
  }
  return onCV
}
