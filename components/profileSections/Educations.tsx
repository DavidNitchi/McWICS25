import { Dispatch, SetStateAction } from "react";

interface EducationProps {
  educations: {
    id: string;
    school: string;
    degree_type: string;
    major: string;
    start_date: string | null;
    end_date: string | null;
    userId: string;
  }[];
  modal: Dispatch<
    SetStateAction<
      [
        "projects" | "education" | "skills" | "works" | "extraCur" | null,
        string
      ]
    >
  >;
}

const EducationInfo: React.FC<EducationProps> = ({ educations, modal }) => {
  return (
    <section className="p-4 bg-gray-100 rounded-lg shadow space-x-4 ">
      <h2 className="text-2xl font-semibold mb-2">Education</h2>
      <ul>
        {educations.map((work, index) => (
          <li
            key={index}
            className="mb-4 hover:underline"
            onClick={() => modal(["education", work.id])}
          >
            <h3 className="font-bold">{work.major}</h3>
            <p>{work.school}</p>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-zinc-400"
        onClick={() => modal(["education", ""])}
      >
        Add Education
      </button>
    </section>
  );
};

export default EducationInfo;
