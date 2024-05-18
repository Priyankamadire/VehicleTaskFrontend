import React, { useState, useEffect, useRef } from "react";
import "./Simulation.css";

const Simulation = ({ scenario, vehicles }) => {
  const [movingVehicles, setMovingVehicles] = useState([]);
  const intervalsRef = useRef([]);

  useEffect(() => {
    if (scenario && vehicles) {
      const filteredVehicles = vehicles.filter(
        (v) => v.scenarioId === scenario.id
      );
      setMovingVehicles(filteredVehicles);
    }
  }, [scenario, vehicles]);

  const moveVehicle = (vehicle) => {
    const interval = setInterval(() => {
      let outOfBounds = false;
      setMovingVehicles((prevVehicles) =>
        prevVehicles.map((v) => {
          if (v.id === vehicle.id) {
            let newX = v.posX;
            let newY = v.posY;

            switch (v.direction) {
              case "Towards":
                newX += v.speed;
                break;
              case "Backwards":
                newX -= v.speed;
                break;
              case "Upwards":
                newY -= v.speed;
                break;
              case "Downwards":
                newY += v.speed;
                break;
              default:
                break;
            }

            newX = Math.max(0, Math.min(newX, 950));
            newY = Math.max(0, Math.min(newY, 350));

            if (newX === 0 || newX === 950 || newY === 0 || newY === 350) {
              outOfBounds = true;
            }

            return { ...v, posX: newX, posY: newY };
          }
          return v;
        })
      );

      if (outOfBounds) {
        clearInterval(interval);
      }
    }, 1000 / vehicle.speed);

    intervalsRef.current.push(interval);
  };

  const startSimulation = () => {
    intervalsRef.current.forEach(clearInterval); // Clear any existing intervals
    intervalsRef.current = []; // Reset the interval array
    movingVehicles.forEach((vehicle) => moveVehicle(vehicle));
  };

  const stopSimulation = () => {
    intervalsRef.current.forEach(clearInterval); // Clear all intervals
    intervalsRef.current = []; // Reset the interval array
  };

  return (
    <div className="Simulation">
      <div className="buttons-container">
        <button className="start-button" onClick={startSimulation}>
          Start Simulation
        </button>
        <button className="stop-button" onClick={stopSimulation}>
          Stop Simulation
        </button>
      </div>
      <div className="SimulationArea">
        {movingVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="vehicle-marker"
            style={{
              left: `${vehicle.posX}px`,
              top: `${vehicle.posY}px`,
            }}
          >
            {vehicle.id}
          </div>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Simulation;
