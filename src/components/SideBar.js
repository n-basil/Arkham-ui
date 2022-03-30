import React from "react";
import { useContext, useEffect } from "react"
import WorkspaceContext from "../context/WorkspaceContext";

import Default from  "./SideBar-Views/Default";
import NewNode from "./SideBar-Views/NewNode"
import EditNode from "./SideBar-Views/EditNode"
import LinkView from "./SideBar-Views/LinkView"

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";


const drawerWidth = '25%';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    margin: 0,
    // width: '100vw',
    // height: '100vh',
    


  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#999999',   
    // height: '100vh', 
  },
}));

export default function SideBar(props) {
  const { selectedSideView, setSelectedSideView, selectedNode, selectedLink } = useContext(WorkspaceContext);
  // let setSelectedSideView = function (view) {
  //   console.log('setSelectedSideView call with: ', view)
  //   setSelectedSideViewOG(view)
  // }
  const classes = useStyles();

  function SideBarRender() {
    console.log('view rendered with:', selectedSideView)
    if (selectedSideView === 'Default') {
      return <Default 
      setSelectedSideView={setSelectedSideView}
      />;
    } else if (selectedSideView === 'NewNode') {
      return <NewNode 
      setSelectedSideView={setSelectedSideView}
      />;
    } else if (selectedSideView === 'EditNode' && selectedNode) {
      return <EditNode 
      setSelectedSideView={setSelectedSideView}
      />;
    } else if (selectedSideView === 'LinkView') {
      return <LinkView 
      setSelectedSideView={setSelectedSideView}
      />;
    }
  }

  return (
    // <></>
      <Drawer
        data-testid="SideBarDrawer"
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
