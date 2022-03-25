import React from "react";
import {useState, useEffect} from "react";
import WorkspaceContext from "../context/WorkspaceContext";
// import AppContext from "./context/AppContext";

import NavBar from "../components/NavBar";
import Graph from "../components/Graph";
import SideBar from "../components/SideBar";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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

export default function Workspace() {
  const classes = useStyles();
  const theme = useTheme();
  let [newNode, setNewNode] = useState({});
  let [nodes, setNodes] = useState([]);
  let [links, setLinks] = useState([]);
  let [selectedLink, setSelectedLink] = useState({});
  const [open, setOpen] = React.useState(false);
  let [selectedNode, setSelectedNode] = useState(false);
  // let [ selectedSideView, setSelectedSideView ] = useState('Default');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // INTERACTIONS WITH API
  // const getAllNodesAndLinks = () => {
  //   var myHeaders = new Headers();

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //     mode: "cors",
  //   };

  //   fetch("http://localhost:6969/allNodes", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("GET ALL NODES RESULT: ", result);
  //       setNodes(result);
  //     })
  //     .catch((error) => console.log("GET ALL NODES ERROR: ", error));

  //   fetch("http://localhost:6969/allLinks", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("GET ALL LINKS RESULT: ", result);
  //       setLinks(result);
  //     })
  //     .catch((error) => console.log("GET ALL LINKS ERROR: ", error));
  // };

  const getAllNodesAndLinks = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    fetch("http://localhost:6969/allNodes", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("GET ALL NODES RESULT: ", result);
        setNodes(result);

        fetch("http://localhost:6969/allLinks", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log("GET ALL LINKS RESULT: ", result);
            setLinks(result);
          })
          .catch((error) => console.log("GET ALL LINKS ERROR: ", error));
      })
      .catch((error) => console.log("GET ALL NODES ERROR: ", error));
  };

  useEffect(() => {
    getAllNodesAndLinks();
  }, []);

  const addNewNodeToDB = (nodeToAdd) => {
    var myHeaders = new Headers();
    //myHeaders.append("id", uuid);
    myHeaders.append("node", JSON.stringify(nodeToAdd));

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: nodeToAdd,
      redirect: "follow",
    };

    return fetch("http://localhost:6969/node", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("NODE ADDED: ", data))
      .catch((error) => console.log("ADD NODE ERROR: ", error));
  };

  const addNewLinkToDB = (src, tgt) => {
    var myHeaders = new Headers();
    myHeaders.append("source", src);
    myHeaders.append("target", tgt);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:6969/link", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("LINK ADDED"))
      .catch((error) => console.log("ADD LINK ERROR: ", error));
  };

  const addNewNode = function (nodeToAdd) {
    console.log("YOU MADE IT NEW ADDNEWNODE")
    // let newId = uuidv4();
    //setNodes((nodes) => [...nodes, { id: newId, ...newNode }]);
    addNewNodeToDB(nodeToAdd)
      .then(() => getNode(nodeToAdd.id))
      .then((nodeFromDB) => setNodes([...nodes, nodeFromDB]))
    //setLinks((links) => [...links, { source: selectedNode, target: newId }]);
    //addNewLinkToDB(selectedNode.id, newId);
  };

  const deleteLink = () => {
    var myHeaders = new Headers();
    myHeaders.append("source", selectedLink.source);
    myHeaders.append("target", selectedLink.target);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:6969/link", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("LINK DELETED");
        getAllNodesAndLinks();
      })
      .catch((error) => console.log("DELETE LINK ERROR: ", error));
  };

  const deleteNode = () => {
    var myHeaders = new Headers();
    myHeaders.append("id", selectedNode);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:6969/node", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("NODE DELETED");
        //setTimeout(getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("DELETE NODE ERROR: ", error));
  };

  const getNode = (nodeId) => {
    var myHeaders = new Headers();
    myHeaders.append("id", nodeId);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch("http://localhost:6969/node", requestOptions)
      .then((response) => response.json())
      .then((nodeFromDB) => {
        console.log("GET NODE SUCCESS");
        console.log("Node From DB: ", nodeFromDB);
        setSelectedNode(nodeFromDB[0])
        return nodeFromDB[0]
        //setTimeout(getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("GET NODE ERROR: ", error));
  };

  const updateNode = (nodeId, update) => {
    var myHeaders = new Headers();
    myHeaders.append("id", nodeId);
    myHeaders.append("update", update); //update needs to be following format: {param: paramValue}

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:6969/node", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("PATCH NODE SUCCESS");
        //setTimeout(getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("PATCH NODE ERROR: ", error));
  };

  const getLink = (src, tgt, update) => {
    var myHeaders = new Headers();
    myHeaders.append("source", src);
    myHeaders.append("target", tgt);
    myHeaders.append("update", update); //update needs to be following format: {param: paramValue}

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:6969/link", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("GET LINK SUCCESS");
        //setTimeout(getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("GET LINK ERROR: ", error));
  };

  const updateLink = (src, tgt) => {
    var myHeaders = new Headers();
    myHeaders.append("source", src);
    myHeaders.append("target", tgt);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:6969/node", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("PATCH LINK SUCCESS");
        //setTimeout(getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("PATCH LINK ERROR: ", error));
  };

  let contextObj = {
    selectedNode,
    setSelectedNode,
    deleteLink,
    deleteNode,
    getNode,
    updateNode,
    getLink,
    updateLink,
    newNode,
    setNewNode,
    nodes,
    setNodes,
    addNewNode,
    links,
    setLinks,
    getAllNodesAndLinks,
  };

  return (
    <WorkspaceContext.Provider value={contextObj}>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          data-testid='NavBar'
          handleDrawerOpen={handleDrawerOpen}
          open={open}
          drawerWidth={drawerWidth}
        />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Graph
            data-testid='Graph'
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
        </main>
      </div>
    </WorkspaceContext.Provider>
  );
}
