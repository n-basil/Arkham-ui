import React from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default function Default(props) {
  const { newAddNode, deleteLink, deleteNode } = useContext(AppContext);
  // const classes = useStyles();
  // const theme = useTheme();

  // const useStyles = makeStyles(theme => ({
  //   button: {
  //       backgroundColor: "#FDE311"
  //   }}));
  return (
    
    <>
      <Button 
      variant="contained" 
      onClick={() => {props.setSelectedSideView("NewNode")}}
      className={classes.button}
      >
        New Node
      </Button>
      <Button 
      variant="contained" 
      onClick={deleteLink}
      className={classes.button}
      >
        DELETE LINK
      </Button>
      <Button 
      variant="contained" 
      onClick={deleteNode}
      className={classes.button}
      >
        DELETE BUTTON
      </Button>
    </>
  );
}
