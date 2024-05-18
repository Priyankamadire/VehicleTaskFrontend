import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./VehicleForm.css";

function VehicleForm({ addVehicle }) {
  const { id } = useParams(); // Scenario ID from the URL
  const navigate = useNavigate(); // Navigation hook to redirect after form submission
  const [name, setName] = useState("");
  const [posX, setPosX] = useState("");
  const [posY, setPosY] = useState("");
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("Towards");
  const [error, setError] = useState("");

  const GRAPH_CONTAINER_WIDTH = 950;
  const GRAPH_CONTAINER_HEIGHT = 350;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const parsedPosX = parseInt(posX);
    const parsedPosY = parseInt(posY);
    const parsedScenarioId = parseInt(id); // Parse id to integer

    // Validation for position
    if (
      parsedPosX < 0 ||
      parsedPosX > GRAPH_CONTAINER_WIDTH ||
      parsedPosY < 0 ||
      parsedPosY > GRAPH_CONTAINER_HEIGHT
    ) {
      setError(
        `Position must be within 0 and ${GRAPH_CONTAINER_WIDTH} for X and 0 and ${GRAPH_CONTAINER_HEIGHT} for Y`
      );
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
          scenarioId: parsedScenarioId, // Use the parsed scenarioId
        }
      );

      // If addVehicle function is passed as prop, call it
      if (addVehicle) {
        addVehicle(response.data);
      }

      // Clear the form
      setName("");
      setPosX("");
      setPosY("");
      setSpeed("");
      setDirection("Towards");
      setError("");

      // Navigate back to the scenario details page
      navigate("/all-scenarios");
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="add-vehiclecontainer">
      <h2 className="form-title">Add New Vehicle</h2>
      <form onSubmit={handleSubmit} className="add-vehicleform">
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

        {error && (
          <div className="errormessage" style={{ color: "red" }}>
            {error}
          </div>
        )}
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

export default VehicleForm;
