import React, { useState } from "react";

function VKUFormatter() {
  const [rawData, setRawData] = useState("");
  const [formattedData, setFormattedData] = useState(null);
  const [formattedText, setFormattedText] = useState("");
  const [selectedSession, setSelectedSession] = useState("2024-25"); // Default session

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

  const getStateFromString = (rawData) => {
    const normalizedData = rawData.toLowerCase();
    for (const state of states) {
      if (
        normalizedData.includes(state.name.toLowerCase()) ||
        state.aliases.some((alias) => normalizedData.includes(alias.toLowerCase()))
      ) {
        return state.name;
      }
    }
    return "Not mentioned";
  };

  const formatStudentData = (rawData) => {
    const data = rawData.split("\t");
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
      state: getStateFromString(rawData),
      studentContact: `${data[5]?.trim() || ""}, ${data[11]?.trim() || ""}`.trim(),
      email: data[6]?.trim() || "Not mentioned",
    };
  };

  const handleFormat = () => {
    const formatted = formatStudentData(rawData);
    setFormattedData(formatted);

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
      Session: ${selectedSession}
    `.trim();

    setFormattedText(text);
  };

  const handleCopy = () => {
    if (formattedText) {
      navigator.clipboard.writeText(formattedText);
      alert("Make Sure city is Correct!");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", position: "relative", minHeight: "100vh" }}>
      <h1>Student Data Formatter</h1>

      {/* Session Dropdown */}
      <label htmlFor="session">Select Session: </label>
      <select
        id="session"
        value={selectedSession}
        onChange={(e) => setSelectedSession(e.target.value)}
        style={{ padding: "5px", fontSize: "16px", marginBottom: "20px" }}
      >
        <option value="2022-23">2022-23</option>
        <option value="2023-24">2023-24</option>
        <option value="2024-25">2024-25</option>
        <option value="2025-26">2025-26</option>
      </select>

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
            minHeight: "80vh",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              maxWidth: "600px",
              width: "90%",
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
                margin: "10px auto 0",
                cursor: "pointer",
                backgroundColor: "lightblue",
              }}
            >
              Click here to copy the Details
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "20px",
          fontSize: "14px",
          color: "#555",
        }}
      >
        Developed by <strong>Er. Manish</strong>
      </div>
    </div>
  );
}

export default VKUFormatter;
