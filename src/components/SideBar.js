import React from "react";
import { useContext } from "react"
import WorkspaceContext from "../context/WorkspaceContext";


import Default from  "./SideBar-Views/Default";
import NewNode from "./SideBar-Views/NewNode"

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
  // let [ selectedSideView, setSelectedSideView ] = useState('Default');
  const { selectedSideView, setSelectedSideView } = useContext(WorkspaceContext);
  const classes = useStyles();

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
        <SideBarRender />      
      </Drawer>
  );
}
