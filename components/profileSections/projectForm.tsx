"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addProject, editProject, getProjectById } from "@/db/query";
import { verifySession } from "@/db/dal";

export default function ProjectForm(props: { projectId: string, close: any }) {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "",
    id: "",
    skills_used: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const getData = async () => {
      const result = await verifySession();
      if (props.projectId != "") {
        const project = await getProjectById(props.projectId);
        setFormData(project);
      }
      setEmail(result.email as string);
    };
    getData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const projectData = {
      title: formData.title || "",
      description: formData.description || "",
      userId: email || "",
      id: props.projectId || uuidv4(),
      skills_used: formData.skills_used ?? "",
      start_date: formData.start_date || "",
      current_job: formData.current_job,
      end_date: formData.end_date || "",
    };
    if (!projectData.title || !projectData.description) {
      alert("Title and description are required");
      return;
    }
    if (props.projectId) {
      await editProject(projectData);
    } else {
      await addProject(projectData);
    }

    // Reset form after successful submission
    setFormData({
      title: "",
      description: "",
      userId: "",
      id: "",
      skills_used: "",
      start_date: "",
      end_date: "",
    });

    console.log("Project saved successfully");
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
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-zinc-400"
      >
        Add
      </button>
    </form>
  );
}
