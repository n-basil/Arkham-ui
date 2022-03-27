import React from "react";
import { useContext, useEffect } from "react";
import WorkspaceContext from "../../context/WorkspaceContext";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#FDE311",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerContent: {
      padding: theme.spacing(1)
  }
}));

export default function Default(props) {
  const { selectedNode, deleteNode, handleDrawerClose, getLink, nodesLinked, setNodesLinked } = useContext(WorkspaceContext);

  const classes = useStyles();
  const theme = useTheme();

  const SelectedNodeRender = () => {
    return (
      <>
        {selectedNode ? (
          <div className={classes.drawerContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {selectedNode.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {selectedNode.notes}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Node Linked: 
            </Typography>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  useEffect(() => {
    // getLink(selectedNode.id, 'sans').then((data) => {
    //   setNodesLinked(data.map((el) => {
    //     return el.name
    //   }).join(', '));
    // })
    // console.log(
    //   nodesLinked
    // )
    SelectedNodeRender()
  }, [selectedNode]);

  return (
    <>
      <div className={classes.drawerHeader}>
        <IconButton
          variant="contained"
          onClick={() => {
            props.setSelectedSideView("NewNode");
          }}
          className={classes.button}
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton
          variant="contained"
          onClick={deleteNode}
          className={classes.button}
        >
          <RemoveCircleIcon />
        </IconButton>
        <IconButton
          variant="contained"
          // onClick={deleteLink}
          className={classes.button}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <SelectedNodeRender />
    </>
  );
}
