import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AllScenarios.css";

const AllScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://vehicletaskbackend.onrender.com/getscenario")
      .then((response) => setScenarios(response.data))
      .catch((error) => console.error("Error fetching scenarios:", error));
  }, []);

  useEffect(() => {
    scenarios.forEach((scenario) => {
      axios
        .get(
          `https://vehicletaskbackend.onrender.com/getvechcount/${scenario.id}`
        )
        .then((response) => {
          setVehicles((prevVehicles) => [
            ...prevVehicles,
            { id: scenario.id, count: response.data.vehicleCount },
          ]);
        })
        .catch((error) =>
          console.error("Error fetching vehicle count:", error)
        );
    });
  }, [scenarios]);

  const handleUpdateClick = (scenarioId) => {
    navigate(`/update/${scenarioId}`);
  };

  const handleDeleteClick = (scenarioId) => {
    navigate(`/delete/${scenarioId}`);
  };

  const handleAddClick = (scenarioId) => {
    navigate(`/addbyid/${scenarioId}`);
  };

  const handleDeleteAll = async () => {
    try {
      if (scenarios.length === 0) {
        window.alert("No scenarios found");
        return;
      }

      const response = await fetch(
        `https://vehicletaskbackend.onrender.com/allscenario`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Scenarios deleted successfully");
        window.alert("Scenarios deleted"); // Display alert message
        navigate("/all-scenarios"); // Redirect to specified page
        window.location.reload(); // Reload the page
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete scenarios");
      }
    } catch (error) {
      console.error("Error deleting scenarios:", error);
    }
  };

  const handleAddVe = () => {
    navigate("/addvehicle");
  };
  const handleNewScno = () => {
    navigate("/add-scenario-form");
  };

  return (
    <div className="all-scenarios-container">
      <center>
        <h1>All Scenarios</h1>
        <button className="btn-addv" onClick={() => handleAddVe()}>
          Add Vehicle
        </button>
        <button className="btn-deleall" onClick={() => handleDeleteAll()}>
          Delete All
        </button>

        <button className="btn-gosc" onClick={() => handleNewScno()}>
          Add Scenario
        </button>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>No of Vehicle</th>
                <th>Add Vehicle</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((scenario) => {
                const vehicle = vehicles.find((v) => v.id === scenario.id);
                return (
                  <tr key={scenario.id}>
                    <td>{scenario.id}</td>
                    <td>{scenario.name}</td>
                    <td>{vehicle ? vehicle.count : 0}</td>
                    <td>
                      <button
                        className="btn-add"
                        onClick={() => handleAddClick(scenario.id)}
                      >
                        Add Vehicle
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-update"
                        onClick={() => handleUpdateClick(scenario.id)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteClick(scenario.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
};

export default AllScenarios;
