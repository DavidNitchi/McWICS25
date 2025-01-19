import EducationForm from "./profileSections/educationForm";
import ExtraCurForm from "./profileSections/ExtraCurForm";
import ProjectForm from "./profileSections/projectForm";
import WorkForm from "./profileSections/workForm";
import SkillForm from "./profileSections/addSkillForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // title: string;
  // children: React.ReactNode;
  modalType: [string | null, string];
}

// Dispatch<SetStateAction<["projects" | "education" | "skills" | "works" | "extraCur" | null, string]>>

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, modalType }) => {
  if (!isOpen) return null;
  let child = <></>;
  let title = "";
  switch (modalType[0]) {
    case "addCategory":
      child = <ProjectForm projectId={modalType[1]} close={onClose} />;
      title = "Add a new Category";
      break;
    case "skills":
      child = <SkillForm close={onClose} />;
      title = "Add a Skill";
      break;
    case "projects":
      child = <ProjectForm projectId={modalType[1]} close={onClose} />;
      title = "Project";
      break;
    case "works":
      child = <WorkForm workId={modalType[1]} close={onClose} />;
      title = "Work Experience";
      break;
    case "education":
      child = <EducationForm educationId={modalType[1]} close={onClose} />;
      title = "Education";
      break;
    case "extraCur":
      child = <ExtraCurForm extraCurId={modalType[1]} close={onClose} />;
      title = "Extracurricular";
      break;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {child}
      </div>
    </div>
  );
};

export default Modal;
