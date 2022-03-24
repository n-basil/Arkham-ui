import React from "react";
import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#FDE311",
    margin: "2%",
  },
}));

export default function Default(props) {
  const { newAddNode, deleteLink, deleteNode, selectedNode } =
    useContext(AppContext);
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      {selectedNode ? (
        <>
          <Typography gutterBottom variant="h5" component="h2">
            {selectedNode.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {selectedNode.notes}
          </Typography>
        </>
      ) : (
        <></>
      )}
      <Button
        variant="contained"
        onClick={() => {
          props.setSelectedSideView("NewNode");
        }}
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
