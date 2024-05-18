import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";

const Delete = () => {
  const navigate = useNavigate(); // To manage browser history
  const { id } = useParams();

  const deleteScno = async () => {
    try {
      const response = await fetch(
        `https://vehicletaskbackend.onrender.com/scenario/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Scenario deleted successfully");
        window.alert("Scenario deleted"); // Display alert message
        navigate("/all-scenarios"); // Redirect to specified page
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete Scenario");
      }
    } catch (error) {
      console.error("Error deleting Scenario:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Are you sure you want to delete the Scenario?</h1>
      <button style={buttonStyle} onClick={deleteScno}>
        Yes
      </button>
      <NavLink to="/all-scenarios" style={navLinkStyle}>
        <button style={buttonStyle}>No</button>
      </NavLink>
    </div>
  );
};

// Inline CSS styles
const containerStyle = {
  textAlign: "center",
  marginTop: "50px",
};

const headerStyle = {
  fontSize: "24px",
  marginBottom: "20px",
};

const buttonStyle = {
  backgroundColor: "#f44336",
  color: "white",
  padding: "10px 20px",
  margin: "0 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  textDecoration: "none",
};

const navLinkStyle = {
  textDecoration: "none",
  color: "white",
};

export default Delete;
