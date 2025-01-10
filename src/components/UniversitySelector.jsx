import React from "react";

function UniversitySelector({ onSelect }) {
  return (

    <div className="flex flex-col items-center justify-center space-y-5">
      <h1 style={{
          fontFamily: "'Poppins', sans-serif", // Use a modern font
          fontSize: "48px", // Make the text large
          color: "#4CAF50", // Use a prominent color (green in this case)
          textAlign: "center", // Center the text
          fontWeight: "bold", // Make the font bold
          letterSpacing: "2px", // Add spacing between letters
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Add a shadow for depth
          margin: "50px 0", // Add spacing around the element
          padding: "20px", // Add padding for a balanced look
          border: "3px solid #4CAF50", // Add a border matching the font color
          borderRadius: "10px", // Round the corners of the border
          background: "linear-gradient(90deg, #ffffff, #f0f0f0)", // Subtle gradient background
        }}>
  SkillSilo Education PVT LTD
      </h1>

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
      <button
        onClick={() => onSelect("JSU")}
        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        JS University
      </button>
    </div>
  );
}

export default UniversitySelector;
