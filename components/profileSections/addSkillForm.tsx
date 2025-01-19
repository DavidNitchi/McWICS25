"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addSkill } from "@/db/query";
import { verifySession } from "@/db/dal";

export default function skillForm(props: { close: any }) {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    skill: "",
  });

  useEffect(() => {
    const getData = async () => {
      const result = await verifySession();
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
    const skillData = {
      skill: formData.skill,
    };
    if (!skillData.skill) {
      alert("Skill is required");
      return;
    }

    await addSkill(email, formData.skill);

    // Reset form after successful submission
    setFormData({
      skill: ""
    });

    console.log("skill saved successfully");

  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 bg-gray-100 rounded-lg shadow px-6"
    >
      <label htmlFor="skill">Skill</label>
      <input
        type="text"
        name="skill"
        id="skill"
        value={formData.skill}
        onChange={handleChange}
        className="border p-2 rounded"
        required
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
