import React from "react";

function UniversitySelector({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <h1 className="text-3xl font-bold text-gray-800">Select Your University</h1>
      <button
        onClick={() => onSelect("VKU")}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        VKU University
      </button>
      <button
        onClick={() => onSelect("MKU")}
        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        MKU University
      </button>
    </div>
  );
}

export default UniversitySelector;
