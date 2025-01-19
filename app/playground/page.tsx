"use client";
import { useState, useEffect } from "react";
import { prompt } from "@/api/geminiAPI";
import { render } from "@/api/puppeteer";
import { fit } from "@/api/greedyAlg";
// import Component from "@/components/reactToPDF";
import { getAllUserExperiences } from "@/db/query";

export default function Page() {
  const [format, setFormat] = useState<any[][] | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [buttonClick, setClick] = useState(true);
  const userInfo =
  '{  "extracurricular_activities": [    {      "index": 1,      "title": "Coding Club Member",      "details": [        "Organized weekly coding challenges and hackathons.",        "Mentored junior members in JavaScript and Python programming."      ]    },    {      "index": 2,      "title": "Sports Team Captain",      "details": [        "Led the college soccer team to regional championships.",        "Coordinated practice schedules and team-building activities."      ]    },    {      "index": 3,      "title": "Volunteer at Animal Shelter",      "details": [        "Managed social media campaigns to promote pet adoptions.",        "Designed an online portal to streamline volunteer sign-ups."      ]    },    {      "index": 4,      "title": "Student Government Representative",      "details": [        "Advocated for student issues and presented solutions to administration.",        "Led initiatives to improve campus mental health services."      ]    },    {      "index": 5,      "title": "Music Club Member",      "details": [        "Played lead guitar in a band that performed at college events.",        "Organized an annual music festival with over 500 attendees."      ]    }  ],  "job_experiences": [    {      "index": 1,      "title": "Software Development Intern",      "company": "XYZ Tech",      "details": [        "Developed a web application using React and Node.js to automate invoice processing.",        "Improved application performance, reducing API response time by 30%."      ]    },    {      "index": 2,      "title": "Customer Support Associate",      "company": "ABC Corp",      "details": [        "Resolved over 150 customer inquiries per week via email and chat.",        "Implemented a new ticketing system, reducing response time by 20%."      ]    },    {      "index": 3,      "title": "Teaching Assistant",      "company": "University of Knowledge",      "details": [        "Assisted in teaching introductory computer science courses.",        "Designed and graded assignments for 50+ students."      ]    },    {      "index": 4,      "title": "Freelance Web Developer",      "details": [        "Built and deployed custom websites for small businesses using WordPress and Wix.",        "Delivered projects within tight deadlines, earning high client satisfaction."      ]    },    {      "index": 5,      "title": "Retail Associate",      "company": "Local Bookstore",      "details": [        "Managed inventory and organized book displays to increase sales.",        "Developed a customer loyalty program, boosting repeat customers by 15%."      ]    }  ],  "projects": [    {      "index": 1,      "title": "Personal Finance Tracker App",      "details": [        "A mobile app built using Flutter to track expenses and budget efficiently.",        "Integrated charts and data visualization using D3.js."      ]    },    {      "index": 2,      "title": "AI-Powered Chatbot",      "details": [        "Designed a chatbot using Python and GPT-4 API to handle customer queries.",        "Deployed the bot on a company’s e-commerce website, improving customer engagement."      ]    },    {      "index": 3,      "title": "Weather Forecast Dashboard",      "details": [        "Created a React-based dashboard consuming data from OpenWeatherMap API.",        "Implemented features like live weather updates and historical data analysis."      ]    },    {      "index": 4,      "title": "Inventory Management System",      "details": [        "Built a desktop application using Java and MySQL for small businesses.",        "Automated inventory tracking, reducing manual errors by 40%."      ]    },    {      "index": 5,      "title": "Portfolio Website",      "details": [        "Developed a personal portfolio using Next.js and Tailwind CSS.",        "Hosted on Vercel with CI/CD pipelines for updates."      ]    }  ],  "education": [    {      "index": 1,      "degree": "Bachelor of Science in Computer Science",      "institution": "University of Technology",      "graduation_year": 2024,      "relevant_courses": [        "Data Structures",        "Machine Learning",        "Web Development",        "Database Systems"      ]    },    {      "index": 2,      "degree": "High School Diploma",      "institution": "Springfield High School",      "graduation_year": 2020,      "awards": [        "National Science Olympiad Winner",        "Math Team Captain"      ]    },    {      "index": 3,      "certification": "Full-Stack Web Development",      "platform": "Coursera (University of Michigan)",      "completion_year": 2022,      "focus": [        "React",        "Node.js",        "MongoDB",        "Express.js"      ]    },    {      "index": 4,      "bootcamp": "Data Science Bootcamp",      "platform": "DataCamp",      "completion_year": 2023,      "skills": [        "Python",        "R",        "SQL"      ]    },    {      "index": 5,      "minor": "Statistics",      "institution": "University of Knowledge",      "graduation_year": 2024,      "courses": [        "Probability",        "Regression Analysis",        "Statistical Computing"      ]    }  ]}';
const jobDescription =
  "About the job About Super.com We started Super.com to help maximize lives–both the lives of our customers and the lives of our employees– so that everyone can experience all that life has to offer. For our employees, our promise is that Super.com is more than just a job; it’s an opportunity to unlock one’s potential, where learning is celebrated and impact is realized. We are more than a fast-paced, high-growth tech company; we care about our people and take career progression seriously. This is your career and our aim is to supercharge it through the people, the work, and the programs that fuel who we are. About The Role We are looking to hire Software Engineering Interns with at least 8 months of experience to join our engineering team. It is a really exciting and technically challenging time for our engineering teams as we focus on 3 development pillars: travel, fintech, and a superapp membership to unite them along with other savings and earnings use cases. Between them, our services handle 1000s of requests per second, ingest over 1TB of data per day and process over $1MM per day in sales, while maintaining a 99.9+% uptime. Problems You’ll Address Ship technically challenging projects end-to-end in a fast-paced, iterative environment Have the opportunity to very meaningfully propel the business forward, and recognize the impact of your work on the company’s business metrics and user experience Own features, services, caches, and databases, including: deployment, monitoring, debugging, and testing Write production-ready, well-tested code in your first week Be data-driven and close to the customer, performing experiments for nearly everything you launch Work on a combination of frontend and backend work across multiple services and codebases Our Tech We use a state of the art architecture powered by microservices written primarily in Python (FastAPI). We use React (with TypeScript) on the frontend, and Postgres/Redis for storage and caching We use Gitlab for version control and CI/CD, and our infrastructure is hosted on AWS (using Kubernetes). It takes under 30 minutes for merged code to reach production We invest heavily in monitoring and automated alerting using Datadog We use Amplitude client-side metrics and experimentation, and Snowflake for our data warehouse About You You have at least 8 months of web development work experience, preferably with exposure to a dynamic, startup or scaleup environment You have experience working with a modern frontend JS framework (ex. React, Vue, Angular), and have worked with web servers You learn quickly, regardless of the languages and technologies used You have experience taking ownership and shipping entire features end-to-end You thrive on decoding intricate problems with logical, well-reasoned solutions You are interested in working on both the frontend and backend components of features You are interested in working with React on the frontend and Python on the backend We've got you covered Compensation: we pay our Interns top-of-market $300 One-time home office set up allowance $25/Week UberEats allowance on Fridays $300/Term Learning and Development allowance $120/Term Fitness/Wellness allowance Top Talent: work with the best in the world, including Engineers and Leadership from Google, Uber, and more Build Something Great: most importantly, build a product used by millions around the world - have ownership, have impact, and do great work We Believe in Equal Opportunity We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status. Accommodations are available on request for candidates taking part in all aspects of the selection process. If needed, please notify our Talent Acquisition Partner.";
 
  const formatExperiences = function () {
      let educationFormatted = [];
      let ind = 0;
      for (let educationExp of data![0]) {
        let clone = (({ id, userId, ...rest }) => rest)(educationExp);
        let indexedClone = { index: ind, ...clone };
        educationFormatted.push(indexedClone);
        ind++;
      }
  
      let workFormatted = [];
      ind = 0;
      for (let workExp of data![1]) {
        let clone = (({ id, userId, ...rest }) => rest)(workExp);
        let indexedClone = { index: ind, ...clone };
        workFormatted.push(indexedClone);
        ind++;
      }
  
      let projectFormatted = [];
      ind = 0;
      for (let projectExp of data![2]) {
        let clone = (({ id, userId, ...rest }) => rest)(projectExp);
        let indexedClone = { index: ind, ...clone };
        projectFormatted.push(indexedClone);
        ind++;
      }
  
      let extrasFormatted = [];
      ind = 0;
      for (let extrasExp of data![3]) {
        let clone = (({ id, userId, ...rest }) => rest)(extrasExp);
        let indexedClone = { index: ind, ...clone };
        extrasFormatted.push(indexedClone);
        ind++;
      }
      return [
        //educationFormatted,
        //workFormatted,
        projectFormatted,
        //extrasFormatted,
      ];
    };
    useEffect(() => {
    const fetchAll = async () => {
      const response = await getAllUserExperiences("m@gmail.com");
      console.log(response)
      if (response) setData(response);
      return;
    };

    const fetchData = async () => {
      const response = await prompt(jobDescription, format);
      setReply(response);
    };
    fetchAll().then(() => {
      setFormat(formatExperiences())
      console.log(format)
      fetchData();
    });
  }, [buttonClick]);

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-green-400 text-white p-4 border rounded-md border-black hover:text-xl"
        onClick={() => setClick((prev) => !prev)}
      >
        Prompt
      </button>
      <button
        className="bg-green-400 text-white p-4 border rounded-md border-black hover:text-xl"
        onClick={() => render()}
      >
        Generate PDF
      </button>
      <div className="border border-black w-[500px] h-[500px]">
        {reply && <p>{reply}</p>}
      </div>
      {/* <Component></Component> */}
      <button
        className="bg-green-400 text-white p-4 border rounded-md border-black hover:text-xl"
        onClick={() => fit()}
      >
        Test!
      </button>
    </div>
  );
}
