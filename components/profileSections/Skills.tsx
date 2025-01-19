import { Dispatch, SetStateAction } from "react";

interface SkillsProps {
  skills: string[];
  modal: Dispatch<
    SetStateAction<
      [
        "skills" | "projects" | "education" | "works" | "extraCur" | null,
        string
      ]
    >
  >;
}

const SkillInfo: React.FC<SkillsProps> = ({ skills, modal }) => {
  return (
    <section className="p-4 bg-gray-100 rounded-lg shadow w-full">
      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <ul className="list-disc pl-5">
        {skills.map((skill, index) => (
          <li key={index}>
            <strong>{skill}</strong>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => modal(["skills", ""])}
      >
        Add Skill
      </button>
    </section>
  );
};

export default SkillInfo;
