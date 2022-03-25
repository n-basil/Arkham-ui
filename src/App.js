// REACT
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AppContext from "./context/AppContext";
// KEY CLOAK
import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "./components/Keycloak";

import Keycloak from "keycloak-js";
//import ArkhamAuthenticator from "./components/ArkhamAuthenticator";
import HideRoute from "./components/HideRoute";

// ARKHAM
import Paper from "@material-ui/core/Paper";
import Workspace from "./views/Workspace";
import Login from "./views/Login";

export default function App() {
  // STATE VARIABLES
  // let [selectedNode, setSelectedNode] = useState(false);
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");

  // This instanciates the keycloak object
  const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "arkham",
    clientId: "arkham-ui",
  });

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

            <Route path="/workspace-dev" element={<Workspace />} />

        
            
            {/* Keycloak Hide page */}
            <Route
              path="/workspace"
              element={
                <HideRoute>
                  <p>wow</p>
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
