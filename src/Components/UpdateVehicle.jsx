import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateVehicle = () => {
  const { id } = useParams();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for alert
  const navigate = useNavigate();
  const [updateposX, setUpdateposX] = useState("");
  const [updateposY, setUpdateposY] = useState("");
  const [speed, setSpeed] = useState("");
  const [direction, setDirection] = useState("");

  useEffect(() => {
    axios
      .get(`https://vehicletaskbackend.onrender.com/vehiclesbyid/${id}`)
      .then((response) => {
        setSelectedVehicle(response.data);
        setUpdatedName(response.data.name);
        setUpdateposX(response.data.posX);
        setUpdateposY(response.data.posY);
        setSpeed(response.data.speed);
        setDirection(response.data.direction);
      })
      .catch((error) => console.error("Error fetching vehicle:", error));
  }, [id]);

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `https://vehicletaskbackend.onrender.com/updatevehicle/${id}`,
        {
          name: updatedName,
          posX: updateposX,
          posY: updateposY,
          speed: speed,
          direction: direction,
        }
      );
      console.log("Updated Vehicle:", response.data);
      setShowAlert(true); // Show the alert on successful update
      // Automatically hide the alert after 3 seconds
      setTimeout(() => setShowAlert(false), 3000);
      // Navigate back to all scenarios page after update
      setTimeout(() => navigate("/start-simulation"), 3000);
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  return (
    <div>
      <center>
        <h2>Update Vehicle</h2>
        {selectedVehicle && (
          <form onSubmit={handleUpdateSubmit} style={formStyle}>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Vehicle Name"
              style={inputStyle}
              required
            />
            <input
              type="number"
              value={updateposX}
              onChange={(e) => setUpdateposX(e.target.value)}
              placeholder="Initial Position X"
              style={inputStyle}
              required
            />
            <input
              type="number"
              value={updateposY}
              onChange={(e) => setUpdateposY(e.target.value)}
              placeholder="Initial Position Y"
              style={inputStyle}
              required
            />
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              placeholder="Speed"
              style={inputStyle}
              required
            />
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              style={inputStyle}
            >
              <option value="Towards">Towards</option>
              <option value="Backwards">Backwards</option>
              <option value="Upwards">Upwards</option>
              <option value="Downwards">Downwards</option>
            </select>
            <button type="submit" style={buttonStyle}>
              Update Vehicle
            </button>
          </form>
        )}
        {showAlert && (
          <div style={alertStyle}>Vehicle successfully updated!</div>
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

export default UpdateVehicle;
