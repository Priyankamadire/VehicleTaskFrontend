import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const { id } = useParams();
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for alert
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://vehicletaskbackend.onrender.com/getscenariobyid/${id}`)
      .then((response) => {
        setSelectedScenario(response.data);
        setUpdatedName(response.data.name);
        setUpdatedTime(response.data.time);
      })
      .catch((error) => console.error("Error fetching scenario:", error));
  }, [id]);

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://vehicletaskbackend.onrender.com/updatescenario/${id}`,
        {
          name: updatedName,
          time: parseInt(updatedTime),
        }
      );
      console.log("Updated scenario:", response.data);
      setShowAlert(true); // Show the alert on successful update
      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(false), 3000);
      // Navigate back to all scenarios page after update
      setTimeout(() => navigate("/all-scenarios"), 3000);
    } catch (error) {
      console.error("Error updating scenario:", error);
    }
  };

  return (
    <div>
      <center>
        <h2>Update Scenario</h2>
        {selectedScenario && (
          <form onSubmit={handleUpdateSubmit} style={formStyle}>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Scenario Name"
              style={inputStyle}
              required
            />
            <input
              type="number"
              value={updatedTime}
              onChange={(e) => setUpdatedTime(e.target.value)}
              placeholder="Time in Sec"
              style={inputStyle}
              required
            />
            <button type="submit" style={buttonStyle}>
              Update Scenario
            </button>
          </form>
        )}
        {showAlert && (
          <div style={alertStyle}>Scenario successfully updated!</div>
        )}
      </center>
    </div>
  );
};

const formStyle = {
  maxWidth: "400px",
  padding: "20px",
  backgroundColor: "#f1f1f1",
  borderRadius: "8px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
};

const inputStyle = {
  width: "100%",
  padding: "12px 20px",
  margin: "8px 0",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "14px 20px",
  margin: "8px 0",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const alertStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "14px 20px",
  margin: "8px 0",
  borderRadius: "4px",
};
export default UpdatePage;
