import React from "react";
import { useState } from "react"

import Default from  "./SideBar-Views/Default";
import NewNode from "./SideBar-Views/NewNode"

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#C0C0C0',
    padding: theme.spacing(1)
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

export default function SideBar(props) {
  let [ selectedSideView, setSelectedSideView ] = useState('Default');
 
  const classes = useStyles();
  const theme = useTheme();

  function SideBarRender() {
    console.log('view:', selectedSideView)
    if (selectedSideView === 'Default') {
      return <Default setSelectedSideView={setSelectedSideView}/>;
    } else if (selectedSideView === 'NewNode') {
      return <NewNode 
      setSelectedSideView={setSelectedSideView}
      />;
    }
  }

  return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <SideBarRender />      
      </Drawer>
  );
}
