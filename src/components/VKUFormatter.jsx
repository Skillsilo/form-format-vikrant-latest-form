import React, { useState } from "react";


function VKUFormatter() {
  const [rawData, setRawData] = useState(""); // Raw data input by the user
  const [formattedData, setFormattedData] = useState(null); // Formatted data output
  const [formattedText, setFormattedText] = useState(""); // Formatted text for display

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
      if (
        normalizedData.includes(state.name.toLowerCase()) || // Match exact name
        state.aliases.some((alias) => normalizedData.includes(alias.toLowerCase())) // Match aliases
      ) {
        return state.name;
      }
    }
    return "Not mentioned";
  };
  

  // Function to format raw data
  const formatStudentData = (rawData) => {
    const data = rawData.split("\t"); // Split raw data using tab space

    // Determine semester based on LE status
    const semester = data[8]?.trim().toLowerCase() === "yes" ? "3rd" : "1st";

    return {
      studentName: data[0]?.trim() || "Not mentioned",
      fatherName: data[1]?.trim() || "Not mentioned",
      motherName: data[16]?.trim() || "Not mentioned",
      course: data[7]?.trim() || "Not mentioned",
      branch: data[10]?.trim() || "Not mentioned",
      semester: semester,
      aadharNumber: data[17]?.trim() || "Not mentioned",
      city: `${data[4]?.trim() || ""}`.trim(),
      state: getStateFromString(rawData), // Use the state-matching function
      studentContact: `${data[5]?.trim() || ""}, ${data[11]?.trim() || ""}`.trim(),
      email: data[6]?.trim() || "Not mentioned",
    };
  };

  // Handler to format the data
  const handleFormat = () => {
    const formatted = formatStudentData(rawData);
    setFormattedData(formatted);

    // Generate formatted text for display and clipboard
    const text = `
     
      Student Name: ${formatted.studentName}
      Father's Name: ${formatted.fatherName}
      Mother's Name: ${formatted.motherName}
      Course: ${formatted.course}
      Branch: ${formatted.branch}
      Semester: ${formatted.semester}
      Aadhar Number: ${formatted.aadharNumber}
      City: ${formatted.city.split(" ").pop() || formatted.city}
      State: ${formatted.state}
      Student Contact: ${formatted.studentContact.split(",")[0]}
      Email: ${formatted.email}
      Session: 2024-25
    `.trim();
    setFormattedText(text);
  };

  // Handler to copy formatted data to the clipboard
  const handleCopy = () => {
    if (formattedText) {
      navigator.clipboard.writeText(formattedText);
      alert("Make Sure city is Correct!");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Student Data Formatter</h1>
      <textarea
        value={rawData}
        onChange={(e) => setRawData(e.target.value)}
        placeholder="Paste raw data here"
        rows="10"
        cols="50"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      ></textarea>
      <br />
      <button
        onClick={handleFormat}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        Format Data
      </button>
      {formattedData && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Full viewport height for vertical centering
      backgroundColor: "#f9f9f9", // Optional: Add a light background for contrast
    }}
  >
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #ddd", // Add a border around the container
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle shadow
        maxWidth: "600px",
        width: "90%", // Ensure responsiveness
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Formatted Data</h2>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "15px",
          borderRadius: "5px",
          fontSize: "16px",
          overflowX: "auto",
        }}
      >
        {JSON.stringify(formattedData, null, 2)}
      </pre>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Formatted Output</h2>
      <pre
        style={{
          background: "#e8f5e9",
          padding: "15px",
          borderRadius: "5px",
          fontSize: "16px",
          overflowX: "auto",
        }}
      >
        {formattedText}
      </pre>
      <button
        onClick={handleCopy}
        style={{
          display: "block",
          padding: "10px 20px",
          fontSize: "16px",
          margin: "10px auto 0", // Center the button horizontally
          cursor: "pointer",
          backgroundColor:"lightblue"
        }}
      >
        Click here to copy the Details
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default VKUFormatter;
