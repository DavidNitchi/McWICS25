"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addEducation, editEducation, getEducationById } from "@/db/query";
import { verifySession } from "@/db/dal";

export default function educationForm(props: {
  educationId: string;
  close: any;
}) {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    userId: "",
    id: "",
    school: "",
    degree_type: "",
    major: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const getData = async () => {
      const result = await verifySession();
      if (props.educationId != "") {
        const education = await getEducationById(props.educationId);
        setFormData(education);
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
    const educationData = {
      school: formData.school || "",
      degree_type: formData.degree_type || "",
      userId: email || "",
      id: props.educationId || uuidv4(),
      major: formData.major ?? "",
      start_date: formData.start_date || "",
      end_date: formData.end_date || "",
    };
    if (!educationData.school || !educationData.degree_type) {
      alert("school and degree_type are required");
      return;
    }
    if (props.educationId) {
      await editEducation(educationData);
    } else {
      await addEducation(educationData);
    }

    // Reset form after successful submission
    setFormData({
      school: "",
      degree_type: "",
      userId: "",
      id: "",
      major: "",
      start_date: "",
      end_date: "",
    });

    console.log("education saved successfully");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 bg-gray-100 rounded-lg shadow px-6"
    >
      <label htmlFor="school">School</label>
      <input
        type="text"
        name="school"
        id="school"
        value={formData.school}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />

      <label htmlFor="degree_type">Degree Type</label>
      <textarea
        name="degree_type"
        id="degree_type"
        value={formData.degree_type}
        onChange={handleChange}
        className="border p-2 rounded"
      ></textarea>

      <label htmlFor="major">Major</label>
      <input
        type="text"
        name="major"
        id="major"
        value={formData.major}
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
