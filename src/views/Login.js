import React from "react";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";

// KEYCLOAK
import {  useNavigate } from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web';

import logo from "../assets/Arkham_Logo_Black.svg";
import LoginBtn from "../components/loginBtn";
import "./Login.css";

export default function Login() {


  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  return (
    <Paper className="paper">
      <img data-testid="logo" src={logo} style={{maxWidth: '460px', marginBottom: '1vh'}} />
      <Card variant="outlined" className="loginCard">
        {keycloak.authenticated ? navigate("/workspace") : console.log("User is not authenticated")}
        <LoginBtn />
      </Card>
    </Paper> 
  );
}