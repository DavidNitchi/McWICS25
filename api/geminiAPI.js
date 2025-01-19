"use server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import {
  GoogleAICacheManager,
  GoogleAIFileManager,
} from "@google/generative-ai/server";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const schema = {
  description: "Information to include",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      Experience: {
        type: SchemaType.ARRAY,
        description: "indices of work experience to include",
        items:{
          type: SchemaType.NUMBER
        }
      },
      Education: {
        type: SchemaType.ARRAY,
        description: "indices of education to include",
        items:{
          type: SchemaType.NUMBER
        }
      },
      Projects: {
        type: SchemaType.ARRAY,
        description: "indices of projects to include",
        items:{
          type: SchemaType.STRING
        }
      },
      ECA: {
        type: SchemaType.ARRAY,
        description: "indices of ECAs to include",
        items:{
          type: SchemaType.NUMBER
        }
      },
      Skills: {
        type: SchemaType.ARRAY,
        description: "indices of Skills to include",
        items:{
          type: SchemaType.NUMBER
        }
      }
    }
  }
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-001",
  generationConfig: {
    responseMimeType: "application/json",
    //responseSchema: schema,
  },
});

export async function reset(){
  return (await model.generateContent("Clear the context.")).response.text()
}

export async function prompt(jobDescription, userInfo) {
  console.log("userInfo", userInfo)
  const promptText = `
  Given the job description ${jobDescription}, For each of the entries in ${JSON.stringify(userInfo)}, Give it a score between 0 and 1, based on the probability of it being relevant to the job, as well the reasoning behind the score
  Output format for each entry: 
  score: [Score]
  Do not output anything besides the score for the entry
  `
  return (await model.generateContent(promptText)).response.text();
}

// This is useless since context must contain min 32k tokens to store
// export async function createContext(userID, data) {
//   try {
//     // Assuming we get a JSON file with the user's data and initializes the model with their UID
//     let contextText = "";

//     if (typeof data === 'string'){
//         contextText = data
//     } else if (typeof data === 'object'){
//         for (const key in data) {
//             if (Object.prototype.hasOwnProperty.call(data, key)){
//                 contextText += `${key}: ${data[key]}, `;
//             }
//         }
//     }

//     // Creates the cache along with instantiating the context
//     const cacheManager = new GoogleAICacheManager(process.env.API_KEY);

//     const cacheResult = await cacheManager.create({
//       model: "models/gemini-1.5-flash-001",
//       contents: [{ role: "user", parts: [{text: contextText}] }],
//     });

//     // Creates the model from the given context
//     const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//     const model = genAI.getGenerativeModelFromCachedContent(cacheResult);

//     // return the model
//     return model

//   } catch (error) {
//     console.error("Error creating Gemini context:", error);
//     throw error;
//   }
// }
