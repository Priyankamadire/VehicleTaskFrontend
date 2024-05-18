import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, toggleSidebar, toggleDashboard }) {
  return (
    <>
      <div className="toggle-dashboard-button" onClick={toggleDashboard}></div>
      <button className="toggle-button" onClick={toggleSidebar}>
        toggle
      </button>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2>SideBar</h2>
        <ul className="sidebar-list">
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-scenario-form" activeClassName="active">
              Add Scenario
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-scenarios" activeClassName="active">
              All Scenarios
            </NavLink>
          </li>
          <li>
            <NavLink to="/addvehicle" activeClassName="active">
              Add Vehicle
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
