import React, { useState } from "react";
import UniversitySelector from "./components/UniversitySelector";
import VKUFormatter from "./components/VKUFormatter";
import MKUFormatter from "./components/MKUFormatter";
import JSFormatter from "./components/JSFormatter";

function App() {
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const renderFormatter = () => {
    switch (selectedUniversity) {
      case "VKU":
        return <VKUFormatter />;
      case "MKU":
        return <MKUFormatter />;
      case "JSU":
        return <JSFormatter />;
      default:
        return <UniversitySelector onSelect={setSelectedUniversity} />;
    }
  };

  return <div className="min-h-screen bg-gray-50 p-5">{renderFormatter()}</div>;
}

export default App;
