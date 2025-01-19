"use client";

import UserInfo from "./profileSections/UserInfo";
import ProjectInfo from "./profileSections/Projects";
import Works from "./profileSections/Works";
import Education from "./profileSections/Educations";
import ExtraCur from "./profileSections/ExtraCur";
import Modal from "./modal";
import { useEffect, useState } from "react";
import { verifySession } from "@/db/dal";
import {
  getEducation,
  getExtracurricular,
  getProject,
  getUser,
  getworkExperience,
} from "@/db/query";
import SkillInfo from "./profileSections/Skills";

export default function User() {
  const [allData, setAllData] = useState({
    user: {
      isAuth: true,
      email: "tsariov.den@gmail.com",
    },
    uInfo: {
      name: "Denis Tsariov",
      email: "tsariov.den@gmail.com",
      password: "$2b$10$nrwg4C5yRzMi8kXMtHy43e.ouD8Gk4pNpmRimxNhLinHU/TxZ.MTC",
      skills: ["programming"],
    },
    projects: [
      {
        id: "519c6de7-0ee6-4345-b25e-951688bbc697",
        title: "test",
        description: "test test",
        skills_used: "sick",
        start_date: "2025-01-16",
        end_date: "2025-01-17",
        userId: "tsariov.den@gmail.com",
      },
    ],
    workExperiences: [],
    education: [],
    extracurriculars: [],
  });
  const [activeModal, setActiveModal] = useState<
    [
      (
        | "skills"
        | "projects"
        | "works"
        | "education"
        | "extraCur"
        | null
      ),
      string
    ]
  >([null, ""]);
  useEffect(() => {
    async function getData() {
      const user = await verifySession();
      const uInfo = await getUser(user.email as string);
      const projects = await getProject(user.email as string);
      const workExperiences = await getworkExperience(user.email as string);
      const education = await getEducation(user.email as string);
      const extracurriculars = await getExtracurricular(user.email as string);
      return {
        user: user,
        uInfo: uInfo,
        projects: projects,
        workExperiences: workExperiences,
        education: education,
        extracurriculars: extracurriculars,
      };
    }
    getData().then((data) => {
      setAllData(data);
    });
  }, [activeModal]);

  const handleCloseModal = () => setActiveModal([null, ""]);
  return (
    <div className="p-4 max-w-6xl mx-auto flex gap-4 justify-between w-full">
      <div className="w-1/3 h-full space-y-4">
        {/* User Information Section with title at top */}
        <h2 className="text-3xl font-bold mb-6 font-mono h-8">User Info</h2>
        {allData.uInfo && (
          <UserInfo userInfo={allData.uInfo} />
        )}
        <SkillInfo skills={allData.uInfo.skills} modal={setActiveModal} />
      </div>

      <div className="flex-1 space-y-4">
        <div className="relative flex justify-between">
          <button className="font-mono px-4 py-2"></button>
          {/* + button to add a section */}
          <div className="h-10"></div>
          {/* <button
            className="font-mono px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end justify-end"
            onClick={() => setActiveModal(["addCategory", ""])}
          >
            Add Section
          </button> */}
        </div>

        {/* Other sections will fall into place */}
        <ProjectInfo projects={allData.projects} modal={setActiveModal} />
        <Works works={allData.workExperiences} modal={setActiveModal} />
        <Education educations={allData.education} modal={setActiveModal} />
        <ExtraCur extraCur={allData.extracurriculars} modal={setActiveModal} />
        <Modal
          isOpen={activeModal[0] !== null}
          onClose={handleCloseModal}
          modalType={activeModal}
        ></Modal>
      </div>
    </div>
  );
}
