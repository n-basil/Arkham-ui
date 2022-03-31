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
import Grid from '@material-ui/core/Grid';
import LinkIcon from '@material-ui/icons/Link';
import "./Default.css";

import { CSVLink, CSVDownload } from 'react-csv';


const useStyles = makeStyles((theme) => ({
  button: {
    color: "#FDE311",
  },
  drawerHeader: {
    display: "inline-flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    height: '4vw',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerContent: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    height: `100vh`
  },
  formButtons: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  link: {
    display: "inline-flex",
    alignItems: "center"
  },
  divider: {
    marginTop: '1vh',
    marginBottom: '1vh'
  }
}));



export default function Default(props) {
  const { selectedNode,
    deleteNode,
    handleDrawerClose,
    getLink,
    deleteLink,
    links,
    clearWorkspace,
    exportWorkspace,
    selectedNodeLinks, setSelectedNodeLinks,
    fileUpload, setFileUpload, postFile, outputData, exportFlag, setExportFlag } = useContext(WorkspaceContext);

  const classes = useStyles();
  const theme = useTheme();

  const handleFileChange = (e) => {
    console.log("HANDLE FILE CHANGE: ", e.target.files)
    setFileUpload(e.target.files[0])
  }

  const linksRender = selectedNodeLinks.map((link) => {

    return (
      <Grid container direction="row" alignItems="center">
        <Grid item className={classes.link}>
          <LinkIcon />
        </Grid>
        <Grid item>
          <Typography className={classes.link} >
            {link.name}
          </Typography>
        </Grid>
      </Grid>
      // <Typography className={classes.link}>
      //   <LinkIcon />{link.name}
      // </Typography>
    )
  })

  const SelectedNodeRender = () => {
    return (
      <div className={classes.drawerContent}>
        
          {selectedNode ? (
            <>
              <Typography gutterBottom component="h4" variant="h4">
                {selectedNode.name}
              </Typography>
              <Typography component="h6" variant="h6">
                Notes:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {selectedNode.notes}
              </Typography>
              <Divider className={classes.divider}/>
              <Typography component="h6" variant="h6">
                Links:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {linksRender}
              </Typography>
            </>
          ) : (
            <>
            <div>
              <form action='http://arkhamdevops.eastus.cloudapp.azure.com:6969/file' encType="multipart/form-data" method="POST" >
                <Typography component="h4" variant="h4">
                  CSV Import
                </Typography>
                <input style={{ margin: '1vh' }} type="file" name="avatar" />
                {/* <input type="submit" value="Upload a file" /> */}
                <div className={classes.formButtons}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#FDE311" }}
                  >
                    Import
                  </Button>
                </div>
              </form>
            </div>  
              <div style={{ height:`100%`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            {exportFlag ? (
              <>
              <Button
                  onClick={() => setExportFlag(false)}
                  variant="contained"
                  style={{ backgroundColor: "#FDE311", marginBottom: '1vh' }}
                >
              <CSVDownload data={outputData} separator={","} />
              Export Workspace
              </Button>
              </>
              ) : (
                <>
              <Button
                  onClick={() => {
                    exportWorkspace()
                  }}
                  variant="contained"
                  style={{ backgroundColor: "#FDE311", marginBottom: '1vh' }}
                >
                  Export Workspace
                </Button>
                </>
            )}
                <Button
                  onClick={() => {
                    clearWorkspace()
                  }}
                  variant="contained"
                  style={{ backgroundColor: "#FF0400" }}
                >
                  Clear Workspace
                </Button>
              </div>
            </>
          )}
        
      </div>
    );
  };

  return (
    <>
      <Grid container >
        <Grid className={classes.drawerHeader} item xs={4}>
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
          {selectedNode ? <IconButton
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
        </Grid>
        <Grid className={classes.drawerHeader} style={{ justifyContent: 'flex-end'  }} item xs={8}>
          <IconButton
            onClick={handleDrawerClose}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Grid>
      </Grid>
      <Divider classNam={classes.divider}/>
      <SelectedNodeRender />
    </>

  );
}
