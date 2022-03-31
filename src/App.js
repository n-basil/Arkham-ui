// REACT
import React from "react";
import "./App.css";
import { Route, Routes, Redirect } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AppContext from "./context/AppContext";
// KEY CLOAK
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./components/Keycloak";

import Keycloak from "keycloak-js";
import HideRoute from "./components/HideRoute";
import { useKeycloak } from "@react-keycloak/web";

// ARKHAM
import Paper from "@material-ui/core/Paper";
import Workspace from "./views/Workspace";
import Login from "./views/Login";

export default function App() {
  // STATE VARIABLES
  // let [selectedNode, setSelectedNode] = useState(false);
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");
  
  // this is the context object exported from the AppContext.js file
  let contextObj = {
    username,
    setUsername,
    password,
    setPassword,
  };

  return (
    <>
      <AppContext.Provider value={contextObj}>
        <ReactKeycloakProvider authClient={keycloak}>
          <Routes>

            <Route path="/" element={<Login />} />
            {/* <Route path="/workspace-dev" element={<Workspace />} /> */}

            {/* Keycloak Hide page */}
            <Route
              path="/workspace"
              element={
                <HideRoute>
      
                  <Workspace />

                </HideRoute>
              }
            />
          </Routes>
        </ReactKeycloakProvider>
      </AppContext.Provider>
    </>
  );
}
