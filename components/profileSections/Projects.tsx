interface ProjectsProps {
    projects: {
      title: string;
      description: string;
    }[];
    toggleProjectInfoPopup: () => void;
  }
  
  const ProjectInfo: React.FC<ProjectsProps> = ({ projects, toggleProjectInfoPopup }) => {
    return (
      <section className="p-4 bg-gray-100 rounded-lg shadow px-7 ">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        <ul>
          {projects.map((project, index) => (
            <li key={index} className="mb-4">
              <h3 className="font-bold">{project.title}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={toggleProjectInfoPopup}>
          Edit Projects
        </button>
      </section>
    );
  };
  
  export default ProjectInfo;

