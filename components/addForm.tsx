import React, { useState, useEffect, useActionState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addProject } from "@/db/query";
import { verifySession } from "@/db/dal";
import * as schema from "@/db/schema";

type NewProject = typeof schema.project.$inferInsert;
const AddForm = () => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await verifySession();
        console.log("result:", result);
        setEmail(result.email as string);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "",
    id: "",
    skills_used: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const object: NewProject = {
        ...formData,
        start_date: formData.start_date.split("-").join(","),
        end_date: formData.end_date.split("-").join(","),
        userId: email,
        id: uuidv4(),
      };
      await addProject(object);
      console.log("Project added successfully");
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  // async function handleSubmit2(state: any, formData: FormData) {
  //   console.log();
  //   const object: NewProject = {
  //     title: formData.get("title"),
  //     description: formData.get("description"),
  //     userId: email,
  //     id: uuidv4(),
  //     skills_used: formData.get("skills_used"),
  //     start_date: formData.get("start_date").split("-").join(","),
  //     end_date: formData.get("end_date").split("-").join(","),
  //   };
  // }

  // const [state, action, pending] = useActionState(handleSubmit2, undefined);

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
        required
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
};

export default AddForm;
