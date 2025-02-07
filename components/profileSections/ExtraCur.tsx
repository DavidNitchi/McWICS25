import { Dispatch, SetStateAction } from "react";

interface ExtraCurProps {
  extraCur: {
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

const ExtraCurInfo: React.FC<ExtraCurProps> = ({ extraCur, modal }) => {
  return (
    <section className="p-4 bg-gray-100 rounded-lg shadow space-x-4 ">
      <h2 className="text-2xl font-semibold mb-2">ExtraCurriculars</h2>
      <ul>
        {extraCur.map((work, index) => (
          <li
            key={index}
            className="mb-4"
            // onClick={() => modal(["education", work.id])}
          >
            <h3 className="font-bold">{work.title}</h3>
            <p>{work.description}</p>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-zinc-400"
        onClick={() => modal(["extraCur", ""])}
      >
        Edit ExtraCurriculars
      </button>
    </section>
  );
};

export default ExtraCurInfo;
