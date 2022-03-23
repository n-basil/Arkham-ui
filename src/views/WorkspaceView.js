import { Graph } from "react-d3-graph";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
// import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export default function WorkspaceView() {

  return (
    <>
      <SideBar />
    </>
  );
}
