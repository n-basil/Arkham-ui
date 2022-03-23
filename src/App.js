import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppContext from "./context/AppContext";
import Paper from "@material-ui/core/Paper";
import WorkspaceView from "./components/Workspace"
import Login from "./views/Login"
export default function App() {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  let contextObj = {
    username,
    password
  };

  return (
    <>
      <AppContext.Provider value={contextObj}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/workspace" element={<WorkspaceView />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}
