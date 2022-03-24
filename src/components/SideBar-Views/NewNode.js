import React from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Button from "@material-ui/core/Button";

export default function NewNode(props) {


  return (
    <>
        <ArrowBackIcon onClick={() => {props.setSelectedSideView("Default")}}/>
    </>
  );
}