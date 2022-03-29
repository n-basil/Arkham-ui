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
import Button from "@material-ui/core/Button";

import "./Default.css";


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
    justifyContent: "center",
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

    return (
      <>
        <br />
        <p>{link.name}</p>
      </>
    )
  })

  const SelectedNodeRender = () => {
    return (
      <>
        {selectedNode ? (
          <div className={classes.drawerContent}>
            <Typography gutterBottom variant="h3" component="h3">
              {selectedNode.name}
            </Typography>
            <Typography component="h5" variant="h5">
                Notes:
              </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {selectedNode.notes}
            </Typography>
            <Divider />
            <Typography component="h5" variant="h5">
                Links:
              </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {linksRender}
            </Typography>
          </div>
        ) : (
          <>
            {/* <form onSubmit={(e) => postFile(e)}>
              <p> Workspace File Upload </p>
              <input type="file" name="avatar" onChange={handleFileChange} />
              <button type="submit"> Upload File </button>
            </form> */}

            <form action='http://arkhamdevops.eastus.cloudapp.azure.com:6969/file' enctype="multipart/form-data" method="POST" >
              <Typography  color="textSecondary" component="h4" variant="h4">
                Upload Data
              </Typography>
              <input type="file" name="avatar"/>
              {/* <input type="submit" value="Upload a file" /> */}
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#FDE311", marginRight: "auto", float: "right" }}
              >
              Upload
              </Button>
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
        {selectedNode? <IconButton
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
        :
        <></>}
        <IconButton 
        style={{selfAlign: 'flex-end'}}
        onClick={handleDrawerClose}
        >
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
