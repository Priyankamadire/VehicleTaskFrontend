import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddVehicle.css";

const AddVehicle = ({ selectedScenario, addVehicle, setSelectedScenario }) => {
  const [name, setName] = useState("");
  const [posX, setPosX] = useState("");
  const [posY, setPosY] = useState("");
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("Towards");
  const [scenarioId, setScenarioId] = useState(
    selectedScenario ? selectedScenario.id : ""
  );
  const [scenarios, setScenarios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://vehicletaskbackend.onrender.com/getscenario")
      .then((response) => setScenarios(response.data))
      .catch((error) => console.error("Error fetching scenarios:", error));
  }, []);

  useEffect(() => {
    if (selectedScenario) {
      setScenarioId(selectedScenario.id);
    }
  }, [selectedScenario]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const parsedPosX = parseInt(posX);
    const parsedPosY = parseInt(posY);

    if (
      parsedPosX < 0 ||
      parsedPosX > 950 ||
      parsedPosY < 0 ||
      parsedPosY > 350
    ) {
      setError("Position must be within 0 and 950 for X and 0 and 350 for Y");
      return;
    }

    try {
      const response = await axios.post(
        "https://vehicletaskbackend.onrender.com/vehicle",
        {
          name,
          posX: parsedPosX,
          posY: parsedPosY,
          speed: parseInt(speed),
          direction,
          scenarioId,
        }
      );
      addVehicle(response.data);
      setName("");
      setPosX("");
      setPosY("");
      setSpeed("");
      setDirection("Towards");
      setError("");
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setError("Failed to add vehicle");
    }
  };

  const handleScenarioChange = (e) => {
    const selectedId = e.target.value;
    const selectedScenario = scenarios.find(
      (scenario) => scenario.id === parseInt(selectedId)
    );
    setScenarioId(selectedId);
    setSelectedScenario(selectedScenario);
  };

  return (
    <div className="add-vehicle-container">
      <h1>Add Vehicle</h1>
      <form onSubmit={handleSubmit} className="add-vehicle-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Vehicle Name"
          required
        />
        <input
          type="number"
          value={posX}
          onChange={(e) => setPosX(e.target.value)}
          placeholder="Initial Position X"
          required
        />
        <input
          type="number"
          value={posY}
          onChange={(e) => setPosY(e.target.value)}
          placeholder="Initial Position Y"
          required
        />
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          placeholder="Speed"
          required
        />
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        >
          <option value="Towards">Towards</option>
          <option value="Backwards">Backwards</option>
          <option value="Upwards">Upwards</option>
          <option value="Downwards">Downwards</option>
        </select>
        <select value={scenarioId} onChange={handleScenarioChange} required>
          <option value="">Select Scenario</option>
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
};

export default AddVehicle;
