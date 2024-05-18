import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Displayvehi.css";
import { useNavigate } from "react-router-dom";
const DisplayVehicle = ({ scenario, vehicles }) => {
  const [movingVehicles, setMovingVehicles] = useState([]);
  const navigate = useNavigate();
  const [vehi, setVehi] = useState([]);

  const handleUpdateClick = (vehiId) => {
    navigate(`/updatevehi/${vehiId}`);
  };

  const handleDeleteClick = (vehiId) => {
    navigate(`/deletevehi/${vehiId}`);
  };
  useEffect(() => {
    if (scenario && vehicles) {
      const filteredVehicles = vehicles.filter(
        (v) => v.scenarioId === scenario.id
      );
      setMovingVehicles(filteredVehicles);
    }
  }, [scenario, vehicles]);

  return (
    <div>
      {movingVehicles.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>PosX</th>
              <th>PosY</th>
              <th>Speed</th>
              <th>Direction</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {movingVehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.name}</td>
                <td>{vehicle.posX}</td>
                <td>{vehicle.posY}</td>
                <td>{vehicle.speed}</td>
                <td>{vehicle.direction}</td>
                <td>
                  <button
                    className="updatvehi"
                    onClick={() => handleUpdateClick(vehicle.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="deltvehi"
                    onClick={() => handleDeleteClick(vehicle.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayVehicle;
