import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ScenarioForm.css"; // Import the form CSS

function ScenarioForm({ addScenario }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vehicletaskbackend.onrender.com/scenario",
        {
          name,
          time: parseInt(time),
        }
      );
      addScenario(response.data);
      setName("");
      setTime("");
      setShowAlert(true); // Show the alert
      setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.error("Error adding scenario:", error);
    }
  };

  const handleReset = () => {
    setName("");
    setTime("");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Scenario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Scenario Name"
          required
        />
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Time in Sec"
          required
        />
        <div className="button-group">
          <button type="submit" className="btn btn-green">
            Add Scenario
          </button>
          <button
            type="button"
            className="btn btn-orange"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
        </div>
      </form>
      {showAlert && <div className="alert">Scenario successfully added!</div>}
    </div>
  );
}

export default ScenarioForm;
