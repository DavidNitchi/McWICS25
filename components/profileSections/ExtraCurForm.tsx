"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addExtraCurricular, editExtraCurricular, getExtraCurricularById } from "@/db/query";
import { verifySession } from "@/db/dal";

export default function extraCurForm(props: { extraCurId: string; close: any }) {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "",
    id: "",
  });

  useEffect(() => {
    const getData = async () => {
      const result = await verifySession();
      if (props.extraCurId != "") {
        const extraCur = await getExtraCurricularById(props.extraCurId);
        setFormData(extraCur);
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
    const extraCurData = {
      title: formData.title || "",
      description: formData.description || "",
      userId: email || "",
      id: props.extraCurId || uuidv4()
    };
    if (!extraCurData.title || !extraCurData.description) {
      alert("Title and description are required");
      return;
    }
    if (props.extraCurId) {
      await editExtraCurricular(extraCurData);
    } else {
      await addExtraCurricular(extraCurData);
    }

    // Reset form after successful submission
    setFormData({
      title: "",
      description: "",
      userId: "",
      id: "",
    });

    console.log("extraCur saved successfully");
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

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
}
