import React from "react";
import { useState, useEffect } from "react";
import WorkspaceContext from "../context/WorkspaceContext";
// import AppContext from "./context/AppContext";

import NavBar from "../components/NavBar";
import GraphRender from "../components/GraphRender";
import SideBar from "../components/SideBar";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Papa from 'papaparse';
import { CSVLink, CSVDownload } from 'react-csv';

const drawerWidth = '25%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}`,
    marginTop: '8vh'
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
  let [nodes, setNodes] = useState(false);
  let [links, setLinks] = useState(false);
  let [selectedLink, setSelectedLink] = useState({});
  const [open, setOpen] = React.useState(false);
  let [selectedNode, setSelectedNode] = useState(false);
  let [render, setRender] = useState(false);
  let [selectedSideView, setSelectedSideView] = useState("Default");
  let [selectedNodeLinks, setSelectedNodeLinks] = useState([])
  let [linksRender, setLinksRender] = useState(false)
  let [fileUpload, setFileUpload] = useState(false);
  let [linksNotSelected, setLinksNotSelected] = useState(false)
  let [outputData, setOutputData] = useState("")
  let [exportFlag, setExportFlag] = useState(false)

  // let setSelectedNode = function (node) {
  //   console.log('setSelectedNode with node: ', node)
  //   setSelectedNodeOG(node)
  // }

  const baseURL = {
    development: `http://arkhamdevops.eastus.cloudapp.azure.com:6969`,
    production: ``
  }[process.env.NODE_ENV || "developement"];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setSelectedSideView('Default')
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

  //   fetch("${baseURL}/allNodes", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("GET ALL NODES RESULT: ", result);
  //       setNodes(result);
  //     })
  //     .catch((error) => console.log("GET ALL NODES ERROR: ", error));

  //   fetch("${baseURL}/allLinks", requestOptions)
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

    fetch(`${baseURL}/allNodes`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("GET ALL NODES RESULT: ", result);
        setNodes(result);

        fetch(`${baseURL}/allLinks`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log("GET ALL LINKS RESULT: ", result);
            setLinks(result);
          })
          .catch((error) => console.log("GET ALL LINKS ERROR: ", error));
      })
      .catch((error) => console.log("GET ALL NODES ERROR: ", error));
  };

  /**
   * On site load, get all nodes and links from the database.
   */
  useEffect(() => {
    console.log('workspace use effect')
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

    return fetch(`${baseURL}/node`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("NODE ADDED: ", data))
      .catch((error) => console.error("ADD NODE ERROR: ", error));
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

    return fetch(`${baseURL}/link`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("LINK ADDED")
        getAllNodesAndLinks()
      })
      .catch((error) => console.log("ADD LINK ERROR: ", error));
  };

  /**
   * Function to add a new node with link to the database.
   * @param {*} nodeToAdd 
   */
  const addNewNode = function (nodeToAdd) {
    // console.log("YOU MADE IT NEW ADDNEWNODE")

    // Send the new node to the database
    addNewNodeToDB(nodeToAdd)
      //Get the nodes from the database after a successful add.
      .then(() => getNode(nodeToAdd.id))
      .then((nodeFromDB) => {
        // Add the new batch of nodes to the state
        setNodes([...nodes, nodeFromDB]);
        // Detect if the user selected a node
        if (selectedNode) {
          console.log('selectedNode for Link', selectedNode)
          // If they did, add a link between the two for the database
          addNewLinkToDB(selectedNode.id, nodeFromDB.id)
            .then(() => getLink(selectedNode.id, nodeFromDB.id))
            .then((linkFromDB) => {
              console.log('linkFromDB', linkFromDB[0]);
              setLinks([...links, linkFromDB[0]]);
            })
        }
      })
  };

  const editNodeInDB = (nodeToEdit) => {
    console.log('nodeToEdit: ', nodeToEdit)
    var myHeaders = new Headers();
    //myHeaders.append("id", uuid);
    myHeaders.append("node", JSON.stringify(nodeToEdit));

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: nodeToEdit,
      redirect: "follow",
    };

    return fetch(`${baseURL}/node`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("NODE EDITED: ", data))
      .catch((error) => console.error("NODE EDIT ERROR: ", error));
  };

  const editNode = function (nodeToEdit) {
    // console.log("YOU MADE IT NEW ADDNEWNODE")

    // Send the edited node to the database
    editNodeInDB(nodeToEdit)
      .then((data) => {
        console.log('data from editDB', data)
        getAllNodesAndLinks();
      })
  };

  const editLinkInDB = (linkToEdit) => {
    console.log('linkToEdit: ', linkToEdit)
    var myHeaders = new Headers();
    //myHeaders.append("id", uuid);
    myHeaders.append("link", JSON.stringify(linkToEdit));

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: linkToEdit,
      redirect: "follow",
    };

    return fetch(`${baseURL}/link`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("LINK EDITED: ", data))
  }
     

  const editLink = function (linkToEdit) {
    editLinkInDB(linkToEdit)
      .then((data) =>{
        console.log('data from editLink', data)
        getAllNodesAndLinks();
      })
  }


  /**
   * Remove a link from the database then update the current canvas.
   * 
   */
  const deleteLink = (src, tgt) => {
    var myHeaders = new Headers();
    // myHeaders.append("source", selectedLink.source);
    // myHeaders.append("target", selectedLink.target);

    myHeaders.append("source", src);
    myHeaders.append("target", tgt);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseURL}/link`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("LINK DELETED");
        // Recall state from database and refresh the canvas.
        getAllNodesAndLinks();
        // setRender(!render)
      })
      .catch((error) => console.log("DELETE LINK ERROR: ", error));
  };

  const deleteNode = () => {
    setSelectedNode(false);
    // handleDrawerClose();
    var myHeaders = new Headers();
    myHeaders.append("id", selectedNode.id);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseURL}/node`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        // NOTE: This is a little hacky. We need to remove the links from the state before we recall the nodes from the database to prevent a crash.
        setLinks([]);
        getAllNodesAndLinks();

        //   const tempLinks = links.filter(e => {
        //     console.log("TEMP LINKS E: ", e);
        //     return e.source !== selectedNode.id && e.target !== selectedNode.id;
        //   });
        //   console.log("TEMP LINKS: ", tempLinks)
        //   setLinks(tempLinks);     
        // })
        // .then(() => {
        // console.log("SELECTED NODE: ", selectedNode)
        // const tempNodes = nodes.splice(nodes.indexOf(selectedNode));
        // // const tempNodes = nodes.filter((node) => console.log(node.id));
        // console.log("TEMP NODES", tempNodes)
        // setNodes(tempNodes);
        // console.log(tempNodes)
      })
      .catch((error) => console.log("DELETE NODE ERROR: ", error));

  };

  // useEffect(() => {
  //   SelectedNodeRender()
  // }, [links]);

  const getNode = (nodeId) => {
    var myHeaders = new Headers();
    myHeaders.append("id", nodeId);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(`${baseURL}/node`, requestOptions)
      .then((response) => response.json())
      .then((nodeFromDB) => {
        console.log("GET NODE SUCCESS");
        console.log("Node From DB: ", nodeFromDB);
        //setSelectedNode(nodeFromDB[0])
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

    fetch(`${baseURL}/node`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("PATCH NODE SUCCESS");
        //setTimeout(getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("PATCH NODE ERROR: ", error));
  };

  /**
   * Gets the links from the database and adds them to the state
   * @param {uuid} src 
   * @param {uuid} tgt 
   * @param {*} update 
   */
  const getLink = (src, tgt) => {
    var myHeaders = new Headers();
    myHeaders.append("source", src);
    myHeaders.append("target", tgt);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(`${baseURL}/link`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("GET LINK SUCCESS: ", data);
        return data
        // if (tgt === 'sans') {
        //   setNodesLinked(data)
        //   console.log('nodesLinked: ', nodesLinked)
        // } else if (src === 'sans') {
        //   setNodesLinkedTo(data)
        //   console.log('nodesLinkedTo: ', nodesLinkedTo)
        // } else {

        // }
        // if (data.length === 1) { return data[0] }
        // else { return data }
        //setTimeout(getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("GET LINK ERROR: ", error));
  };

  // const getLinkBySrc = (src, tgt) => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("source", src);

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   return fetch(`${baseURL}/link`, requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("GET LINK SUCCESS");
  //       return data[0]
  //       //setTimeout(getAllNodesAndLinks(), 500);
  //     })
  //     .catch((error) => console.log("GET LINK ERROR: ", error));
  // };

  const updateLink = (src, tgt, update) => {
    var myHeaders = new Headers();
    myHeaders.append("source", src);
    myHeaders.append("target", tgt);
    myHeaders.append("update", update);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseURL}/node`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("PATCH LINK SUCCESS");
        //setTimeout(getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("PATCH LINK ERROR: ", error));
  };

  const postFile = (e) => {
    e.preventDefault()
    console.log("POST FILE CHECK: ", fileUpload)
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", 'multipart/form-data; boundary="cool boundary"')

    const formData = new FormData()
    formData.append('avatar', fileUpload)
    //formData.append('fileName', fileUpload.name)

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    }

    fetch(`${baseURL}/file`, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        console.log("FILE POST SUCCESSFUL")
      })
      .catch((error) => console.log("FILE POST ERROR: ", error))
  }

  const deleteAllNodesAndLinks = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(`${baseURL}/all`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("DELETE ALL NODES AND LINKS SUCESS");
      })
      .catch((error) => console.log("DELETE ALL ERROR: ", error));
  };

  /**
   * Handle clearing the workspace of all data.
   */
  const clearWorkspace = function () {
    // set the nodes and links to blank to avoid async issues.
    setNodes([]);
    setLinks([]);
    // invoke the api to remove data from the db
    deleteAllNodesAndLinks()
      .then((e) =>{
        console.log('WORKSPACE CLEARED', e);
        // Eventhough the payload is empty, this function will force a re-render.
        getAllNodesAndLinks();
      });
  };

  const exportWorkspace = function () {

    const nodeKeys = Object.keys(nodes[0])
    const linkKeys = Object.keys(links[0])

    let dataArray = []

    for (let i = 0; i < nodes.length; i++) {
      const nodeValues = Object.values(nodes[i])
      const linkValues = Object.values(links[i])
      //console.log("IN LOOP: ", nodeValues, linkValues)
      const tempArr = nodeValues.concat(linkValues)
      //console.log("Temp Arr: ", tempArr)
      dataArray.push(tempArr)
      //console.log("data array: ", dataArray)
    }

    const tempCSVObject = {
      "fields": nodeKeys.concat(linkKeys),
      "data": dataArray
    }
    // console.log("tempObj: ", tempCSVObject)

    const output = Papa.unparse(tempCSVObject)
    console.log("OUTPUT: ", output)

    setOutputData(output);
    setExportFlag(true);
  }


  useEffect(() => {
    if (links) {
      setSelectedNodeLinks([])
      setLinksNotSelected([])
      let linkedIds = []

      let matchingLinks = links.filter(el => selectedNode.id === el.source || selectedNode.id === el.target)

      matchingLinks.forEach((el) => {
        if (el.source === selectedNode.id) {
          linkedIds.push(el.target)
        } else if (el.target === selectedNode.id) {
          linkedIds.push(el.source)
        }
      })

      console.log('linkedIds: ', linkedIds)
      console.log('selectedNode: ', selectedNode)

      const nameIdLinkedArr = nodes.filter(node => linkedIds.includes(node.id));
      const nameIdNotLinkedArr = nodes.filter(node => !linkedIds.includes(node.id));

      setSelectedNodeLinks(nameIdLinkedArr)
      setLinksNotSelected(nameIdNotLinkedArr)
    }
  }, [selectedNode]);

  // useEffect(() => {
  //   setSelectedNodeLinks({ name: 'mocknode' })
  // }, [links])

  let contextObj = {
    selectedNode, setSelectedNode,
    render, setRender,
    linksNotSelected,
    selectedSideView,
    setSelectedSideView,
    addNewLinkToDB,
    deleteLink,
    deleteNode,
    getNode,
    updateNode,
    getLink,
    updateLink,
    nodes,
    setNodes,
    addNewNode,
    links,
    setLinks,
    getAllNodesAndLinks,
    handleDrawerClose,
    handleDrawerOpen,
    selectedNodeLinks,
    setSelectedNodeLinks,
    setLinksNotSelected,
    fileUpload,
    setFileUpload,
    postFile,
    linksRender,
    setLinksRender,
    editNode,
    selectedLink,
    setSelectedLink,
    editLink,
    clearWorkspace,
    exportWorkspace,
    outputData,
    exportFlag,
    setExportFlag
  };
  console.log('rendering workspace')
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
        <SideBar
          open={open}
          handleDrawerClose={handleDrawerClose}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {/* <div className={classes.drawerHeader} /> */}
          <GraphRender
            data-testid='Graph'
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
        </main>
      </div>
    </WorkspaceContext.Provider>
  );
}
