"use client";
import React, { useState } from "react";
import UserInfo from "./profileSections/UserInfo";
import ProjectInfo from "./profileSections/Projects";
// import SkillInfo from "./profileSections/Skills";
import Works from "./profileSections/Works";
import Education from "./profileSections/Educations";
import Extracurriculars from "./profileSections/ExtraCur";

import { getUser, getProject, getworkExperience, getEducation, getExtracurricular } from "../db/query";


export default function UserProfile() {
  const [uInfo, setUInfo] = useState<{ name: string; email: string; password: string } | undefined>(undefined);
//   const [skills, setSkills] = useState<{ name: string; experience: string }[]>([]);
  const [projects, setProjects] = useState<{ id: number; title: string; description: string; skills_used: string; start_date: string | null; end_date: string | null; userId: string }[]>([]);
  const [workExperiences, setWorkExperiences] = useState<{ title: string; description: string }[]>([]);
  const [education, setEducations] = useState<{ title: string; description: string }[]>([]);
  const [extracurriculars, setExtraCur] = useState<{ title: string; description: string }[]>([]);


  React.useEffect(() => {
    async function fetchUser() {
      const user = await getUser("tsariov.den@gmail.com"); // TODO THIS IS HARDCODED
      setUInfo(user);
    }
    fetchUser();
  }, []);
  React.useEffect(() => {
    async function fetchProjects() {
      const projects = await getProject("tsariov.den@gmail.com"); // TODO THIS IS HARDCODED
        setProjects(projects.map(project => ({
          ...project,
          skills_used: project.skills_used as string,
        })));
    }
    fetchProjects();
    }
    , []);
  React.useEffect(() => {
    async function fetchWork() {
      const work = await getworkExperience("tsariov.den@gmail.com"); // TODO THIS IS HARDCODED
        setWorkExperiences(work);
    }
    fetchWork();
    }
    , []);
React.useEffect(() => {
    async function fetchEducation() {
        const education = await getEducation("tsariov.den@gmail.com"); // TODO THIS IS HARDCODED
        setEducations(education.map(edu => ({
            title: edu.school,
            description: `${edu.degree_type} in ${edu.major}`
        })));
    }
    fetchEducation();
    }
    , []);
React.useEffect(() => {
    async function fetchExtra() {
        const extra = await getExtracurricular("tsariov.den@gmail.com"); // TODO THIS IS HARDCODED
        setExtraCur(extra);
    }
    fetchExtra();
    }
    , []);


    // popup for editing info
  const [isUserInfoPopup, setIsUserInfoPopup] = useState(false);
  const [isProjectInfoPopup, setIsProjectInfoPopup] = useState(false);
  const [isSkillInfoPopup, setIsSkillInfoPopup] = useState(false);
    const [isWorkInfoPopup, setIsWorkInfoPopup] = useState(false);
    const [isEducationInfoPopup, setIsEducationInfoPopup] = useState(false);
    const [isExtraInfoPopup, setIsExtraInfoPopup] = useState(false);

    // popup for adding sections
  const [isProjectSection, setProjectSection] = useState(false); 
  const [isSkillSection, setSkillSection] = useState(false);
  const [isWorkSection, setWorkSection] = useState(false);
  const [isEducationSection, setEducationSection] = useState(false);
  const [isExtraSection, setExtraSection] = useState(false);

    // add section
  const [hasProject, setProject] = useState(projects); 
//   if (projects.length > 0) {
//     setProject(true);
//   } 
//   const [hasSkill, setSkill] = useState(false);
  const [hasWork, setWork] = useState(workExperiences);
  const [hasEducation, setEducation] = useState(education);
  const [hasExtra, setExtra] = useState(extracurriculars);

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
  const toggleSkillInfoPopup = () => {
    setIsSkillInfoPopup(!isSkillInfoPopup);
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
  }
const toggleSkillSection = () => {
    setSkillSection(!isSkillSection);
}
const toggleWorkSection = () => {
    setWorkSection(!isWorkSection);
}
const toggleEducationSection = () => {
    setEducationSection(!isEducationSection);
}
const toggleExtraSection = () => {
    setExtraSection(!isExtraSection);
}


  
  return (

    <div className="p-4 max-w-6xl mx-auto flex gap-4 justify-between w-full">
      <div className="w-1/3 h-full space-y-4">
        {/* User Information Section with title at top */}
        <h2 className="text-3xl font-bold mb-6 font-mono h-8">User Info</h2>
        {uInfo && <UserInfo userInfo={uInfo} toggleUserInfoPopup={toggleUserInfoPopup} />}
      </div>

      <div className="flex-1 space-y-4">
        <div className="relative flex justify-between">
            <button className="font-mono px-4 py-2">
            </button>
            {/* + button to add a section */}
            <button className="font-mono px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 self-end justify-end" onClick={toggleDropdown}>
            Add Section
            </button>
            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-10 w-48 bg-white border rounded shadow-lg">
                    <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <button onClick={() => { toggleProjectSection(); toggleDropdown(); }}>Projects</button></li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <button onClick={() => { toggleWorkSection(); toggleDropdown();} }>Work Experiences</button> </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <button onClick={() => { toggleExtraSection(); toggleDropdown();}}>Extracurriculars </button></li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <button onClick={() => { toggleEducationSection(); toggleDropdown();}}>Education</button></li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <button onClick={() => { toggleSkillSection(); toggleDropdown();}}>Skills</button></li>
                    </ul>
                </div>
            )}
        </div>

        {/* Other sections will fall into place */}
        {/* {uInfo && <UserInfo userInfo={uInfo} toggleUserInfoPopup={toggleUserInfoPopup} />} */}
        {hasProject && <ProjectInfo projects={projects} toggleProjectInfoPopup={toggleProjectInfoPopup} />}
        {hasWork && <Works works={workExperiences} toggleWorkInfoPopup={toggleWorkInfoPopup} />}
        {/* {hasSkill && <SkillInfo skills={skills} toggleSkillInfoPopup={toggleSkillInfoPopup} />} */}
        {hasEducation && <Education educations={education} toggleEducationInfoPopup={toggleEducationInfoPopup} />}
        {hasExtra && <Extracurriculars extraCur={extracurriculars} toggleExtraCurInfoPopup={toggleExtraCurInfoPopup} />}


      </div>

      {/* Popup for User Info */}
      {isUserInfoPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Edit Information</h2>
            <form>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  defaultValue={userInfo.name}
                  className="border w-full p-2 rounded"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  defaultValue={userInfo.email}
                  className="border w-full p-2 rounded"
                />
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleUserInfoPopup}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Popup for Projects */}
      {isProjectInfoPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Edit Projects</h2>
            <form>
              <label className="block mb-2">
                Title:
                <input
                  type="text"
                  className="border w-full p-2 rounded"
                />
              </label>
              <label className="block mb-4">
                Description:
                <textarea
                  className="border w-full p-2 rounded"
                />
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleProjectInfoPopup}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Popup for Skills */}
      {isSkillInfoPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Edit Skills</h2>
            <form>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  className="border w-full p-2 rounded"
                />
              </label>
              <label className="block mb-4">
                Experience:
                <textarea
                  className="border w-full p-2 rounded"
                />
              </label>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleSkillSection}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
        {/* Popup for Work Experience */}
        {isWorkInfoPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Edit Work Experience</h2>
                <form>
                <label className="block mb-2">
                    Title:
                    <input
                    type="text"
                    className="border w-full p-2 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Description:
                    <textarea
                    className="border w-full p-2 rounded"
                    />
                </label>
                <div className="flex justify-end space-x-4">
                    <button
                    type="button"
                    onClick={toggleWorkSection}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        {/* Popup for Education */}
        {isEducationInfoPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Edit Education</h2>
                <form>
                <label className="block mb-2">
                    Title:
                    <input
                    type="text"
                    className="border w-full p-2 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Description:
                    <textarea
                    className="border w-full p-2 rounded"
                    />
                </label>
                <div className="flex justify-end space-x-4">
                    <button
                    type="button"
                    onClick={toggleEducationSection}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        {/* Popup for Extra Info */}
        {isExtraInfoPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Edit Extracurriculars</h2>
                <form>
                <label className="block mb-2">
                    Title:
                    <input
                    type="text"
                    className="border w-full p-2 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Description:
                    <textarea
                    className="border w-full p-2 rounded"
                    />
                </label>
                <div className="flex justify-end space-x-4">
                    <button
                    type="button"
                    onClick={toggleExtraSection}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}


      {/* popup to create a projects section */}
        {isProjectSection && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Add Projects</h2>
                <form>
                <label className="block mb-2">
                    Title:
                    <input
                    type="text"
                    className="border w-full p-2 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Description:
                    <textarea
                    className="border w-full p-2 rounded"
                    />
                </label>
                <div className="flex justify-end space-x-4">
                    <button
                    type="button"
                    onClick={toggleProjectSection}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => { toggleProjectSection(); setProject(true); }} //setProject(true);
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}

        {/* popup to create a skills section */}
        {isSkillSection && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Edit Skills</h2>
                <form>
                <label className="block mb-2">
                    Name:
                    <input
                    type="text"
                    className="border w-full p-2 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Experience:
                    <textarea
                    className="border w-full p-2 rounded"
                    />
                </label>
                <div className="flex justify-end space-x-4">
                    <button
                    type="button"
                    onClick={toggleSkillSection}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => { toggleSkillSection();  }} //setSkill(true);
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}

        {/* popup to create a work section */}
        {isWorkSection && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Edit Work Experience</h2>
                <form>
                <label className="block mb-2">
                    Title:
                    <input
                    type="text"
                    className="border w-full p-2 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Description:
                    <textarea
                    className="border w-full p-2 rounded"
                    />
                </label>
                <div className="flex justify-end space-x-4">
                    <button
                    type="button"
                    onClick={toggleWorkSection}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => { toggleWorkSection();  }} //setWork(true);
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}

        {/* popup to create a education section */}
        {isEducationSection && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Edit Education</h2>
                <form>
                <label className="block mb-2">
                    Title:
                    <input
                    type="text"
                    className="border w-full p-2 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Description:
                    <textarea
                    className="border w-full p-2 rounded"
                    />
                </label>
                <div className="flex justify-end space-x-4">
                    <button
                    type="button"
                    onClick={toggleEducationSection}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => { toggleEducationSection();  }} //setEducation(true);
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}

        {/* popup to create a extra section */}
        {isExtraSection && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Edit Extracurriculars</h2>
                <form>
                <label className="block mb-2">
                    Title:
                    <input
                    type="text"
                    className="border w-full p-2 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Description:
                    <textarea
                    className="border w-full p-2 rounded"
                    />
                </label>
                <div className="flex justify-end space-x-4">
                    <button
                    type="button"
                    onClick={toggleExtraSection}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => { toggleExtraSection();  }} //setExtra(true);
                    >
                    Save
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}




    </div>
  );
}
