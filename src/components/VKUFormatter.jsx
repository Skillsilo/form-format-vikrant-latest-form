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
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">🎓 VKU Student Data Formatter</h1>

        {/* Session Dropdown */}
        <div className="mb-4 flex items-center space-x-4">
          <label htmlFor="session" className="font-semibold">Select Session:</label>
          <select
            id="session"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="p-2 rounded-md border border-gray-300 shadow-sm"
          >
            <option value="2022-23">2022-23</option>
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
            <option value="2025-26">2025-26</option>
          </select>
        </div>

        {/* Textarea */}
        <textarea
          value={rawData}
          onChange={(e) => setRawData(e.target.value)}
          placeholder="Paste raw student data here..."
          rows="6"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Format Button */}
        <button
          onClick={handleFormat}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg block mx-auto font-semibold transition duration-200"
        >
          ✅ Format Data
        </button>

        {/* Output */}
        {formattedData && (
          <div className="mt-8 bg-gray-50 border border-blue-100 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">📄 Formatted JSON</h2>
            <pre className="bg-white p-4 rounded border border-gray-200 overflow-x-auto text-sm whitespace-pre-wrap">
              {JSON.stringify(formattedData, null, 2)}
            </pre>

            <h2 className="text-xl font-semibold text-center mt-6 mb-4 text-green-600">📋 Formatted Output</h2>
            <pre className="bg-green-50 p-4 rounded border border-green-200 overflow-x-auto text-sm whitespace-pre-wrap">
              {formattedText}
            </pre>

            <button
              onClick={handleCopy}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg block mx-auto font-medium transition duration-200"
            >
              📎 Copy to Clipboard
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-4 text-sm text-gray-500 italic">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/manish-371634229/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline"
          >
            Er. Manish
          </a>
        </div>

    </div>
  );
}

export default VKUFormatter;
