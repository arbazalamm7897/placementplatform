import React from "react";

const CoreSubjects = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6 pt-24">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Core Subjects</h1>
      <p className="text-gray-700 mb-4">
        Here you can add all the core subjects content for placement preparation.
      </p>
      {/* Example content */}
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Data Structures & Algorithms</li>
        <li>Database Management Systems</li>
        <li>Operating Systems</li>
        <li>Computer Networks</li>
        <li>Object-Oriented Programming</li>
      </ul>
    </div>
  );
};

export default CoreSubjects;
