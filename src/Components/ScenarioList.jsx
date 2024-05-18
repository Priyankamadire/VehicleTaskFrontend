import React, { useState, useEffect } from "react";
import axios from "axios";

function ScenarioList({ onSelectScenario }) {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    // Fetch scenarios from the server
    axios
      .get("https://vehicletaskbackend.onrender.com/getscenario")
      .then((response) => setScenarios(response.data))
      .catch((error) => console.error("Error fetching scenarios:", error));
  }, []);

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>Scenarios</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>ID</th>
            <th style={headerCellStyle}>Name</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              style={rowStyle}
            >
              <td style={cellStyle}>{scenario.serialNumber}</td>
              <td style={cellStyle}>{scenario.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Inline CSS styles
const containerStyle = {
  width: "100%",
  maxWidth: "600px",
  margin: "auto",
};

const headerStyle = {
  textAlign: "center",
  fontSize: "20px",
  marginBottom: "10px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const headerCellStyle = {
  borderBottom: "2px solid #333",
  padding: "10px",
};

const rowStyle = {
  cursor: "pointer",
  borderBottom: "1px solid #ccc",
};

const cellStyle = {
  padding: "10px",
};

export default ScenarioList;
