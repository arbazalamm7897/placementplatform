import React from "react";

const Aptitude = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6 pt-24">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Aptitude</h1>
      <p className="text-gray-700 mb-4">
        This page contains aptitude questions and practice material.
      </p>
      {/* Example content */}
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Quantitative Ability</li>
        <li>Logical Reasoning</li>
        <li>Verbal Ability</li>
        <li>Data Interpretation</li>
        <li>Practice Mock Tests</li>
      </ul>
    </div>
  );
};

export default Aptitude;
