import React, { useState, useEffect } from "react";
import axios from "axios";
import Simulation from "./Simulation";
import DisplayVehicle from "./DisplayVehicle";
import AddVehicle from "./AddVehicle";

const StartSimulation = ({
  scenarios,
  addVehicle,
  selectedScenario,
  setSelectedScenario,
}) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (selectedScenario) {
      axios
        .get(
          `https://vehicletaskbackend.onrender.com/vehicles/${selectedScenario.id}`
        )
        .then((response) => setVehicles(response.data))
        .catch((error) => console.error("Error fetching vehicles:", error));
    }
  }, [selectedScenario]);

  const handleAddVehicle = (vehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, vehicle]);
    addVehicle(vehicle);
  };

  const handleScenarioChange = (event) => {
    const scenarioId = parseInt(event.target.value, 10);
    const selected = scenarios.find((scenario) => scenario.id === scenarioId);
    setSelectedScenario(selected);
  };

  return (
    <div className="home-container">
      <center>
        <div className="main-content" style={mainContentStyle}>
          <h1>Select a Scenario</h1>
          <div style={dropdownContainerStyle}>
            <label htmlFor="scenario-select">Select Scenario:</label>
            <select id="scenario-select" onChange={handleScenarioChange}>
              <option value="">--Select a scenario--</option>
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
          </div>
          {selectedScenario && (
            <>
              <DisplayVehicle scenario={selectedScenario} vehicles={vehicles} />
              <Simulation scenario={selectedScenario} vehicles={vehicles} />
            </>
          )}
        </div>
      </center>
    </div>
  );
};

// Inline CSS styles
const mainContentStyle = {
  maxWidth: "800px",
  margin: "0 auto",
};

const dropdownContainerStyle = {
  marginBottom: "20px",
};

export default StartSimulation;
