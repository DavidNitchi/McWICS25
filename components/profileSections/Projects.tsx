import { Dispatch, SetStateAction } from "react";

interface ProjectsProps {
  projects: {
    title: string;
    description: string;
    id: string;
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

const ProjectInfo: React.FC<ProjectsProps> = ({ projects, modal }) => {
  return (
    <section className="p-4 bg-gray-100 rounded-lg shadow px-7 ">
      <h2 className="text-2xl font-semibold mb-2">Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li
            key={index}
            className="mb-4 hover:underline"
            onClick={() => modal(["projects", project.id])}
          >
            <h3 className="font-bold">{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-zinc-400"
        onClick={() => modal(["projects", ""])}
      >
        Add Project
      </button>
    </section>
  );
};

export default ProjectInfo;
