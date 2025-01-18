import React from "react";

export default function UserProfile() {
  // Static user data
  const userInfo = {
    name: "Greta Ru-Mei",
    email: "greta@example.com",
    bio: "Computer Science student at McGill University. Passionate about coding and machine learning.",
  };

  const skills = ["JavaScript", "TypeScript", "React"];
  const projects = [
    { title: "Calendar App", description: "A SwiftUI calendar app with event management." },
    { title: "Booking Tool", description: "A web development project with scheduling features." },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      {/* User Information Section */}
      <section className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Bio:</strong> {userInfo.bio}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Edit Information
        </button>
      </section>

      {/* Skills Section */}
      <section className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc pl-5">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add Skill
        </button>
      </section>

      {/* Projects Section */}
      <section className="p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        <ul>
          {projects.map((project, index) => (
            <li key={index} className="mb-4">
              <h3 className="font-bold">{project.title}</h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add Project
        </button>
      </section>
    </div>
  );
}
