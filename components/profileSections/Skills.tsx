interface SkillsProps {
    skills: {
      name: string;
      experience: string;
    }[];
    toggleSkillInfoPopup: () => void;
  }
  
  const SkillInfo: React.FC<SkillsProps> = ({ skills, toggleSkillInfoPopup }) => {
    return (
      <section className="p-4 bg-gray-100 rounded-lg shadow w-1/2">
          <h2 className="text-2xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc pl-5">
            {skills.map((skill, index) => (
              <li key={index}>
                <strong>{skill.name}</strong>: {skill.experience}
              </li>
            ))}
          </ul>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={toggleSkillInfoPopup}>
            Add Skill
          </button>
        </section>
    );
  };
  
  export default SkillInfo;

