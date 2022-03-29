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
  const { selectedNode,
    deleteNode,
    handleDrawerClose,
    getLink,
    deleteLink,
    links,
    selectedNodeLinks, setSelectedNodeLinks,
    fileUpload, setFileUpload, postFile } = useContext(WorkspaceContext);

  const classes = useStyles();
  const theme = useTheme();

  const handleFileChange = (e) => {
    console.log("HANDLE FILE CHANGE: ", e.target.files)
    setFileUpload(e.target.files[0])
  }

  const linksRender = selectedNodeLinks.map((link) => {
    return link.name;
  })


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
            <Divider />
            <Typography variant="body2" color="textSecondary" component="p">
              Linked to: {linksRender.join(", ")}
            </Typography>
          </div>
        ) : (
          <>
            <form method="post" action='/file' enctype="multipart/form-data" onSubmit={(e) => postFile(e)}>
              <p> Workspace File Upload </p>
              <input type="file" name="fileName" onChange={handleFileChange} />
              <button type="submit"> Upload File </button>
            </form>
          </>
        )}
      </>
    );
  };

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
          <EditIcon
            onClick={() => {
              props.setSelectedSideView("EditNode");
            }}
          />
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
