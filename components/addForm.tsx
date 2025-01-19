import Form from "next/form";
import {
  addProject,
  addEducation,
  addExtraCurricular,
  addWorkExperience,
} from "@/db/query";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { verifySession } from "@/db/dal";

export default function AddProjectForm() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    // Define an asynchronous function to call the imported function
    const getData = async () => {
      try {
        const result = await verifySession(); // Call the imported function
        setEmail(result.email as string); // Set the variable with the output
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  }),
    [];
  

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "",
    id: uuidv4(),
    skills_used: "",
    start_date: "",
    end_date: "",
    userId: email;
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("penis");
      addProject({
        ...formData,
        start_date: formData.start_date.split("-").join(","),
        end_date: formData.end_date.split("-").join(","),
      });
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 bg-gray-100 rounded-lg shadow px-6"
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 rounded"
      ></textarea>

      <label htmlFor="skills_used">Skills Used</label>
      <input
        type="text"
        name="skills_used"
        id="skills_used"
        value={formData.skills_used}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <label htmlFor="start_date">Start Date</label>
      <input
        type="date"
        name="start_date"
        id="start_date"
        value={formData.start_date}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <label htmlFor="end_date">End Date</label>
      <input
        type="date"
        name="end_date"
        id="end_date"
        value={formData.end_date}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
}
