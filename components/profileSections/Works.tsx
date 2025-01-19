interface WorksProps {
    works: {
      title: string;
      description: string;
    }[];
    toggleWorkInfoPopup: () => void;
  }
  
  const WorkInfo: React.FC<WorksProps> = ({ works, toggleWorkInfoPopup }) => {
    return (
      <section className="p-4 bg-gray-100 rounded-lg shadow px-7">
        <h2 className="text-2xl font-semibold mb-2">Work Experiences</h2>
        <ul>
          {works.map((work, index) => (
            <li key={index} className="mb-4">
              <h3 className="font-bold">{work.title}</h3>
              <p>{work.description}</p>
            </li>
          ))}
        </ul>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={toggleWorkInfoPopup}>
          Edit Works
        </button>
      </section>
    );
  };
  
  export default WorkInfo;

