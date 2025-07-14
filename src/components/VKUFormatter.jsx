import React, { useState } from "react";

function VKUFormatter() {
  const [rawData, setRawData] = useState("");
  const [formattedData, setFormattedData] = useState(null);
  const [formattedText, setFormattedText] = useState("");
  const [selectedSession, setSelectedSession] = useState("2024-25");

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
    <div style={{
      fontFamily: "Segoe UI, sans-serif",
      background: "#f0f4f8",
      minHeight: "100vh",
      padding: "40px 20px",
      position: "relative"
    }}>
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        border: "1px solid #e0e0e0"
      }}>
        <h1 style={{ textAlign: "center", color: "#0077b6" }}>🎓 VKU Student Data Formatter</h1>

        {/* Dropdown */}
        <div style={{ margin: "20px 0" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>Select Session:</label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            style={{
              padding: "8px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <option value="2022-23">2022-23</option>
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
            <option value="2025-26">2025-26</option>
          </select>
        </div>

        {/* Text Area */}
        <textarea
          value={rawData}
          onChange={(e) => setRawData(e.target.value)}
          placeholder="Paste raw student data here..."
          rows="8"
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            background: "#fefefe"
          }}
        />

        {/* Format Button */}
        <button
          onClick={handleFormat}
          style={{
            backgroundColor: "#0077b6",
            color: "#fff",
            pa
