"use client";
import React, { useState } from "react";
import UserInfo from "./profileSections/UserInfo";
import ProjectInfo from "./profileSections/Projects";
import Works from "./profileSections/Works";
import Education from "./profileSections/Educations";
import Extracurriculars from "./profileSections/ExtraCur";
import DropdownButton from "./Buttons/dropdownButton";
import {
  getUser,
  getProject,
  getworkExperience,
  getEducation,
  getExtracurricular,
} from "../db/query";
import AddForm from "./addForm";

export default function UserProfile() {
  const [uInfo, setUInfo] = useState<
    { name: string; email: string; password: string } | undefined
  >(undefined);
  const [projects, setProjects] = useState<
    {
      id: number;
      title: string;
      description: string;
      skills_used: string;
      start_date: string | null;
      end_date: string | null;
      userId: string;
    }[]
  >([]);
  const [workExperiences, setWorkExperiences] = useState<
    { title: string; description: string }[]
  >([]);
  const [education, setEducations] = useState<
    { title: string; description: string }[]
  >([]);
  const [extracurriculars, setExtraCur] = useState<
    { title: string; description: string }[]
  >([]);

  const email = "greta@gmail.com";
  React.useEffect(() => {
    async function fetchUser() {
      const user = await getUser(email); // TODO THIS IS HARDCODED
      setUInfo(user);
    }
    async function fetchProjects() {
      const projects = await getProject(email); // TODO THIS IS HARDCODED
      setProjects(
        projects.map((project) => ({
          ...project,
          skills_used: project.skills_used as string,
        }))
      );
    }
    async function fetchWork() {
      const work = await getworkExperience(email); // TODO THIS IS HARDCODED
      setWorkExperiences(work);
    }
    async function fetchEducation() {
      const education = await getEducation(email); // TODO THIS IS HARDCODED
      setEducations(
        education.map((edu) => ({
          title: edu.school,
          description: `${edu.degree_type} in ${edu.major}`,
        }))
      );
    }
    async function fetchExtra() {
      const extra = await getExtracurricular(email); // TODO THIS IS HARDCODED
      setExtraCur(extra);
    }
    fetchUser();
    fetchProjects();
    fetchWork();
    fetchEducation();
    fetchExtra();
  }, []);

  // popup for editing info
  const [isUserInfoPopup, setIsUserInfoPopup] = useState(false);
  const [isProjectInfoPopup, setIsProjectInfoPopup] = useState(false);
  const [isWorkInfoPopup, setIsWorkInfoPopup] = useState(false);
  const [isEducationInfoPopup, setIsEducationInfoPopup] = useState(false);
  const [isExtraInfoPopup, setIsExtraInfoPopup] = useState(false);

  // popup for adding sections
  const [isProjectSection, setProjectSection] = useState(false);
  const [isWorkSection, setWorkSection] = useState(false);
  const [isEducationSection, setEducationSection] = useState(false);
  const [isExtraSection, setExtraSection] = useState(false);

  // add section TODO
  const [hasProject, setProject] = useState(projects.length > 0);
  const [hasWork, setWork] = useState(workExperiences.length > 0);
  const [hasEducation, setEducation] = useState(education.length > 0);
  const [hasExtra, setExtra] = useState(extracurriculars.length > 0);

  const [isOpen, setIsOpen] = useState(false);

  // toggles
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleUserInfoPopup = () => {
    setIsUserInfoPopup(!isUserInfoPopup);
  };
  const toggleProjectInfoPopup = () => {
    setIsProjectInfoPopup(!isProjectInfoPopup);
  };
  const toggleWorkInfoPopup = () => {
    setIsWorkInfoPopup(!isWorkInfoPopup);
  };
  const toggleEducationInfoPopup = () => {
    setIsEducationInfoPopup(!isEducationInfoPopup);
  };
  const toggleExtraCurInfoPopup = () => {
    setIsExtraInfoPopup(!isExtraInfoPopup);
  };

  const toggleProjectSection = () => {
    setProjectSection(!isProjectSection);
  };
  const toggleWorkSection = () => {
    setWorkSection(!isWorkSection);
  };
  const toggleEducationSection = () => {
    setEducationSection(!isEducationSection);
  };
  const toggleExtraSection = () => {
    setExtraSection(!isExtraSection);
  };

  const mapping = {
    Projects: toggleProjectSection,
    "Work Experience": toggleWorkSection,
    Education: toggleEducationSection,
    Extracurriculars: toggleExtraSection,
  };

  React.useEffect(() => {
    //console.log(workExperiences.length);
    if (projects.length > 0) {
      setProject(true);
    }
    if (education.length > 0) {
      setEducation(true);
    }
    if (workExperiences.length > 0) {
      setWork(true);
    }
    if (extracurriculars.length > 0) {
      setExtra(true);
    }
  }),
    [projects, workExperiences, education, extracurriculars];

  return (
    //console.log(workExperiences.length > 0),
    (
      <div className="p-4 max-w-6xl mx-auto flex gap-4 justify-between w-full">
        <div className="w-1/3 h-full space-y-4">
          {/* User Information Section with title at top */}
          <h2 className="text-3xl font-bold mb-6 font-mono h-8">User Info</h2>
          {uInfo && (
            <UserInfo
              userInfo={uInfo}
              toggleUserInfoPopup={toggleUserInfoPopup}
            />
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div className="relative flex justify-between">
            <button className="font-mono px-4 py-2"></button>
            {/* + button to add a section */}
            <button
              className="font-mono px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end justify-end"
              onClick={toggleDropdown}
            >
              Add Section
            </button>
            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute right-0 mt-10 w-48 bg-white border rounded shadow-lg">
                <ul className="py-2">
                  {Object.entries(mapping).map(([key, value]) => (
                    <DropdownButton
                      key={key}
                      toggleSection={() => value()}
                      toggleDropdown={toggleDropdown}
                      text={key}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Other sections will fall into place */}
          {hasProject && (
            <ProjectInfo
              projects={projects}
              toggleProjectInfoPopup={toggleProjectInfoPopup}
            />
          )}
          {hasWork && (
            <Works
              works={workExperiences}
              toggleWorkInfoPopup={toggleWorkInfoPopup}
            />
          )}
          {hasEducation && (
            <Education
              educations={education}
              toggleEducationInfoPopup={toggleEducationInfoPopup}
            />
          )}
          {hasExtra && (
            <Extracurriculars
              extraCur={extracurriculars}
              toggleExtraCurInfoPopup={toggleExtraCurInfoPopup}
            />
          )}

          <AddForm />
        </div>
      </div>
    )
  );
}
