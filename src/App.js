// REACT
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// KEY CLOAK
import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "./Keycloak";
import Keycloak from "keycloak-js";
//import ArkhamAuthenticator from "./components/ArkhamAuthenticator";

// ARKHAM
import AppContext from "./context/AppContext";
import Paper from "@material-ui/core/Paper";
import WorkspaceView from "./views/WorkspaceView";
import Login from "./views/Login";

export default function App() {
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");

  let contextObj = {
    username,
    password,
  };

  // This instanciates the keycloak object
  const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "arkham",
    clientId: "arkham-ui",
  });

  return (
    <>
      <ReactKeycloakProvider authClient={keycloak}>
        <AppContext.Provider value={contextObj}>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/workspace-dev" element={<WorkspaceView />} />

            {/* Keycloak Hide page */}
            <Route
              path="/workspace"
              element={
                <ArkhamAuthenticator.hide>
                  <WorkspaceView />
                </ArkhamAuthenticator.hide>
              }
            />
          </Routes>
        </AppContext.Provider>
      </ReactKeycloakProvider>
    </>
  );
}
