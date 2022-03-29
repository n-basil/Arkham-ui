import React from "react";
import { useContext, useEffect } from "react"
import WorkspaceContext from "../context/WorkspaceContext";


import Default from  "./SideBar-Views/Default";
import NewNode from "./SideBar-Views/NewNode"
import EditNode from "./SideBar-Views/EditNode"

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#C0C0C0',
  }
}));

export default function SideBar(props) {
  const { selectedSideView, setSelectedSideView, deleteLink } = useContext(WorkspaceContext);
  // let setSelectedSideView = function (view) {
  //   console.log('setSelectedSideView call with: ', view)
  //   setSelectedSideViewOG(view)
  // }
  const classes = useStyles();

  function SideBarRender() {
    console.log('view:', selectedSideView)
    if (selectedSideView === 'Default') {
      return <Default 
      setSelectedSideView={setSelectedSideView}
      />;
    } else if (selectedSideView === 'NewNode') {
      return <NewNode 
      setSelectedSideView={setSelectedSideView}
      />;
    }
    else if (selectedSideView === 'EditNode') {
      return <EditNode 
      setSelectedSideView={setSelectedSideView}
      />;
    }
  }

  useEffect(() => {
    SideBarRender()
  }, [deleteLink])

  return (
    // <></>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <SideBarRender />      
      </Drawer>
  );
}
