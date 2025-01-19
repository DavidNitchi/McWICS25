interface EducationProps {
    educations: {
      title: string;
      description: string;
    }[];
    toggleEducationInfoPopup: () => void;
  }
  
  const EducationInfo: React.FC<EducationProps> = ({ educations, toggleEducationInfoPopup }) => {
    return (
      <section className="p-4 bg-gray-100 rounded-lg shadow space-x-4 ">
        <h2 className="text-2xl font-semibold mb-2">Education</h2>
        <ul>
          {educations.map((work, index) => (
            <li key={index} className="mb-4">
              <h3 className="font-bold">{work.title}</h3>
              <p>{work.description}</p>
            </li>
          ))}
        </ul>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={toggleEducationInfoPopup}>
          Edit Educations
        </button>
      </section>
    );
  };
  
  export default EducationInfo;

