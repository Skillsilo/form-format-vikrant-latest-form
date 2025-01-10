import React, { useState } from "react";

function JSFormatter() {
  const [rawData, setRawData] = useState(""); // Raw data input by the user
  const [formattedText, setFormattedText] = useState(""); // Formatted text for display

  // List of states and their aliases
  const states = [
    { name: "Andhra Pradesh", aliases: ["andra pradesh"] },
    { name: "Arunachal Pradesh", aliases: ["arunachal"] },
    { name: "Assam", aliases: [] },
    { name: "Bihar", aliases: [] },
    { name: "Chhattisgarh", aliases: ["chattisgarh"] },
    { name: "Goa", aliases: [] },
    { name: "Gujarat", aliases: [] },
    { name: "Haryana", aliases: [] },
    { name: "Himachal Pradesh", aliases: ["himachal"] },
    { name: "Jharkhand", aliases: [] },
    { name: "Karnataka", aliases: [] },
    { name: "Kerala", aliases: [] },
    { name: "Madhya Pradesh", aliases: ["mp", "madhya pradesh"] },
    { name: "Maharashtra", aliases: ["maha"] },
    { name: "Manipur", aliases: [] },
    { name: "Meghalaya", aliases: [] },
    { name: "Mizoram", aliases: [] },
    { name: "Nagaland", aliases: [] },
    { name: "Odisha", aliases: ["orissa"] },
    { name: "Punjab", aliases: [] },
    { name: "Rajasthan", aliases: [] },
    { name: "Sikkim", aliases: [] },
    { name: "Tamil Nadu", aliases: ["tn", "tamilnadu"] },
    { name: "Telangana", aliases: [] },
    { name: "Tripura", aliases: [] },
    { name: "Uttar Pradesh", aliases: ["uttar pradesh", "uttar pardesh"] },
    { name: "Uttarakhand", aliases: ["uk", "uttaranchal"] },
    { name: "West Bengal", aliases: ["bengal"] },
  ];
  
  // Function to identify state from raw data
  const getStateFromString = (rawData) => {
    const normalizedData = rawData.toLowerCase(); // Convert raw data to lowercase
    for (const state of states) {
      // Check for exact state name match first
      if (new RegExp(`\\b${state.name.toLowerCase()}\\b`).test(normalizedData)) {
        return state.name;
      }
      // Check for alias matches
      for (const alias of state.aliases) {
        if (new RegExp(`\\b${alias.toLowerCase()}\\b`).test(normalizedData)) {
          return state.name;
        }
      }
    }
    return "Not mentioned";
  };
  

  // Function to format the raw data
  const formatStudentData = (rawData) => {
    if (!rawData) {
      return {
        studentName: "Not mentioned",
        fatherName: "Not mentioned",
        motherName: "Not mentioned",
        course: "Not mentioned",
        branch: "Not mentioned",
        semester: "",
        aadharNumber: "Not mentioned",
        city: "Not mentioned",
        state: "Not mentioned",
        studentContact: "Not mentioned",
        email: "Not mentioned",
      };
    }

    const data = rawData.split("\t"); // Split raw data using tab space

    // Determine semester based on LE status
    const semester = data[17]?.trim()?.toLowerCase() === "yes" ? "3rd" : "1st";

    // Extract city and state
    const presentAddress = data[6]?.trim() || "";
    const state = getStateFromString(rawData);

    return {
      studentName: data[2]?.trim() || "Not mentioned",
      fatherName: data[3]?.trim() || "Not mentioned",
      motherName: data[4]?.trim() || "Not mentioned",
      course: data[1]?.trim() || "Not mentioned",
      branch: data[16]?.trim() || "Not mentioned",
      semester: "",
      aadharNumber: data[11]?.trim() || "Not mentioned",
      city: presentAddress.split(",")[0]?.trim() || "Not mentioned",
      state:  getStateFromString(rawData), 
      studentContact: data[8]?.trim() || "Not mentioned",
      email: data[10]?.trim() || "Not mentioned",
    };
  };

  // Handler to format the data
  const handleFormat = () => {
    const formatted = formatStudentData(rawData);

    // Generate formatted text for display and clipboard
    const text = `
      
      Student Name: ${formatted.studentName}
      Father's Name: ${formatted.fatherName}
      Mother's Name: ${formatted.motherName}
      Course: ${formatted.course}
      Branch: ${formatted.branch}
      Semester: ${formatted.semester}
      Aadhar Number: ${formatted.aadharNumber}
      City: ${formatted.city}
      State: ${formatted.state}
      Student Contact: ${formatted.studentContact}
      Email: ${formatted.email}
    `.trim();
    setFormattedText(text);
  };

  // Handler to copy formatted data to the clipboard
  const handleCopy = () => {
    if (formattedText) {
      navigator.clipboard.writeText(formattedText);
      alert("Formatted data copied to clipboard!");
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">Student Data Formatter</h1>
      <textarea
        value={rawData}
        onChange={(e) => setRawData(e.target.value)}
        placeholder="Paste raw data here"
        rows="10"
        className="w-full p-3 mb-4 border rounded-lg text-base"
      ></textarea>
      <button
        onClick={handleFormat}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
      >
        Format Data
      </button>
      {formattedText && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Formatted Output</h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-base mb-2">{formattedText}</pre>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default JSFormatter;
