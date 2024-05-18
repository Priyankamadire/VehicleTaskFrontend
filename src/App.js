// // src/App.js
// import React, { useState } from "react";
// import ScenarioList from "./Components/ScenarioList";
// import ScenarioForm from "./Components/ScenarioForm";
// import VehicleForm from "./Components/VehicleForm";
// import Simulation from "./Components/Simulation";
// import "./App.css";

// function App() {
//   const [scenarios, setScenarios] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [selectedScenario, setSelectedScenario] = useState(null);

//   const addScenario = (scenario) => {
//     setScenarios([...scenarios, scenario]);
//   };

//   const addVehicle = (vehicle) => {
//     setVehicles([...vehicles, vehicle]);
//   };

//   const handleSelectScenario = (scenario) => {
//     setSelectedScenario(scenario);
//   };

//   return (
//     <div className="App">
//       <div className="Sidebar">
//         <ScenarioForm addScenario={addScenario} />
//         {selectedScenario && (
//           <VehicleForm
//             addVehicle={addVehicle}
//             scenarioId={selectedScenario.id}
//           />
//         )}
//         <ScenarioList
//           scenarios={scenarios}
//           onSelectScenario={handleSelectScenario}
//         />
//       </div>
//       {selectedScenario && (
//         <Simulation scenario={selectedScenario} vehicles={vehicles} />
//       )}
//     </div>
//   );
// }

// export default App;
// // App.js
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./Components/Sidebar";
// import Home from "./Components/Home";
// import AddScenario from "./Components/AddScenario";
// import AllScenarios from "./Components/AllScenarios";
// import AddVehicle from "./Components/AddVehicle";
// import VehicleForm from "./Components/VehicleForm";
// import ScenarioList from "./Components/ScenarioList";
// import ScenarioForm from "./Components/ScenarioForm";
// import Simulation from "./Components/Simulation"; // Ensure this import is correct

// function App() {
//   const [scenarios, setScenarios] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [selectedScenario, setSelectedScenario] = useState(null);

//   const addScenario = (scenario) => {
//     setScenarios([...scenarios, scenario]);
//   };

//   const addVehicle = (vehicle) => {
//     setVehicles([...vehicles, vehicle]);
//   };

//   const handleSelectScenario = (scenario) => {
//     setSelectedScenario(scenario);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Sidebar
//           scenarios={scenarios}
//           onSelectScenario={handleSelectScenario}
//         />
//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/add-scenario"
//               element={<AddScenario addScenario={addScenario} />}
//             />
//             <Route
//               path="/allofscen"
//               element={<AllScenarios scenarios={scenarios} />}
//             />
//             <Route
//               path="/add-vehicle"
//               element={
//                 <AddVehicle
//                   selectedScenario={selectedScenario}
//                   addVehicle={addVehicle}
//                 />
//               }
//             />
//             <Route path="/addmvehicle" element={<VehicleForm />} />
//             <Route
//               path="/scenario-list"
//               element={
//                 <ScenarioList
//                   scenarios={scenarios}
//                   onSelectScenario={handleSelectScenario}
//                 />
//               }
//             />
//             <Route
//               path="/addsce"
//               element={<ScenarioForm addScenario={addScenario} />}
//             />
//           </Routes>

//           {/* <Simulation scenario={selectedScenario} vehicles={vehicles} /> */}
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
// import AddScenario from "./Components/AddScenario";
import AllScenarios from "./Components/AllScenarios";
import ScenarioForm from "./Components/ScenarioForm";
import StartSimulation from "./Components/StartSimulation";
import "./Components/Sidebar.css"; // Import the sidebar CSS
import UpdatePage from "./Components/UpdatePage";
import Delete from "./Components/Delete";
import UpdateVehicle from "./Components/UpdateVehicle";
import DeleteVehicle from "./Components/DeleteVehicle";
import AddVehicle from "./Components/AddVehicle";
import VehicleForm from "./Components/VehicleForm";

function App() {
  const [scenarios, setScenarios] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);

  useEffect(() => {
    // Fetch scenarios from the server
    axios
      .get("https://vehicletaskbackend.onrender.com/getscenario")
      .then((response) => setScenarios(response.data))
      .catch((error) => console.error("Error fetching scenarios:", error));
  }, []);

  const addScenario = (scenario) => {
    setScenarios([...scenarios, scenario]);
  };

  const addVehicle = (vehicle) => {
    setVehicles([...vehicles, vehicle]);
  };

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar
          scenarios={scenarios}
          onSelectScenario={handleSelectScenario}
        />
        <div className="main-content">
          <Routes>
            <Route path="/update/:id" element={<UpdatePage />} />
            <Route path="/delete/:id" element={<Delete />} />
            <Route path="/updatevehi/:id" element={<UpdateVehicle />} />
            <Route path="/deletevehi/:id" element={<DeleteVehicle />} />

            <Route
              path="/addbyid/:id"
              element={<VehicleForm addVehicle={addVehicle} />}
            />

            <Route
              path="/all-scenarios"
              element={<AllScenarios scenarios={scenarios} />}
            />
            <Route
              path="/addvehicle"
              element={
                <AddVehicle
                  addVehicle={addVehicle}
                  selectedScenario={selectedScenario}
                  setSelectedScenario={setSelectedScenario}
                />
              }
            />

            <Route
              path="/start-simulation"
              element={
                <StartSimulation
                  scenarios={scenarios}
                  addVehicle={addVehicle}
                  selectedScenario={selectedScenario}
                  setSelectedScenario={setSelectedScenario}
                />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  scenarios={scenarios}
                  addVehicle={addVehicle}
                  selectedScenario={selectedScenario}
                  setSelectedScenario={setSelectedScenario}
                />
              }
            />

            <Route
              path="/add-scenario-form"
              element={<ScenarioForm addScenario={addScenario} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
