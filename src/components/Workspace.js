import { Graph } from "react-d3-graph";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import './Workspace.css'
// import AppBar from "../components/AppBar";
// import SideBar from "../components/SideBar";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export default function Workspace() {
  // STATE VARIABLES
  let [selectedNode, setSelectedNode] = useState(null);
  let [newNode, setNewNode] = useState({});
  let [nodes, setNodes] = useState([]);
  let [links, setLinks] = useState([]);
  let [selectedLink, setSelectedLink] = useState(null)

  // graph payload (with minimalist structure)
  let data = {
    nodes: nodes,
    links: links,
  };

// INTERACTIONS WITH API
  const getAllNodesAndLinks = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      mode: "cors",
    };

    fetch("http://localhost:8080/allNodes", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("GET ALL NODES RESULT: ", result);
        setNodes(result);
      })
      .catch((error) => console.log("GET ALL NODES ERROR: ", error));

    fetch("http://localhost:8080/allLinks", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("GET ALL LINKS RESULT: ", result);
        setLinks(result);
      })
      .catch((error) => console.log("GET ALL LINKS ERROR: ", error));
  };

  const addNewNodeToDB = (uuid, nodeToAdd) => {
    var myHeaders = new Headers();
    myHeaders.append("id", uuid)
    myHeaders.append("name", nodeToAdd.name);


    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: nodeToAdd,
      redirect: "follow",
    };

    fetch("http://localhost:8080/addNode", requestOptions)
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

    fetch("http://localhost:8080/addLink", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("LINK ADDED"))
      .catch((error) => console.log("ADD LINK ERROR: ", error));
  };

  const deleteLink = () => {
    var myHeaders = new Headers()
    myHeaders.append("source", selectedLink.source)
    myHeaders.append("target", selectedLink.target)

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    }

    fetch("http://localhost:8080/delLink", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("LINK DELETED")
        getAllNodesAndLinks();
      })
      .catch((error) => console.log("DELETE LINK ERROR: ", error));  
  }
  
  const deleteNode = () => {
    var myHeaders = new Headers()
    myHeaders.append("id", selectedNode)

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    }

    fetch("http://localhost:8080/delNode", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("NODE DELETED")
        setTimeout( getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("DELETE NODE ERROR: ", error));  
  }

// PROGRAM FUNCTIONS 

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 100,
      highlightStrokeColor: "blue",
      labelProperty: "name",
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  const onClickNode = function (nodeId) {
    setSelectedNode(nodeId);
  };

  const onClickLink = function (src, tgt) {
    setSelectedLink({source: src, target: tgt})
    //console.log("selected link source: ", selectedLink.source)
  };

  const onMouseOverNode = function(nodeId) {
    // window.alert(`Mouse over node ${nodeId}`);
    // console.log('hover')
};

  const handeNewNodeChange = function (e) {
    let target = e.target;
    let name = target.name;
    setNewNode({ [name]: target.value });
  };

  const newAddNode = function () {
    let newId = uuidv4();
    setNodes([...nodes, { id: newId, ...newNode }]);
    addNewNodeToDB(newId, newNode);
    setLinks([...links, { source: selectedNode, target: newId }]);
    addNewLinkToDB(selectedNode, newId);
  };

  useEffect(() => {
    getAllNodesAndLinks();
    if (selectedNode) {
      selectedNode.color = "#FF0000";
    }
  }, []);

  // DON'T DELETE THIS USE EFFECT. It's doing something, and we don't know what.
  useEffect(() => {
    console.log("Selected Node: ", selectedNode)
  }, [selectedNode])

  useEffect(() =>{
    console.log("Selected Link: ", selectedLink);
  }, [selectedLink]);

  return (
    <>
      <Graph
        id="graph-id" // id is mandatory
        data={data}
        config={myConfig}
        onMouseOverNode={onMouseOverNode}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
      />
      <TextField
        label="Name"
        name="name"
        defaultValue="Name"
        onChange={handeNewNodeChange}
      />

      <Button variant="contained" onClick={newAddNode}>
        New Node
      </Button>
      <Button variant="contained" onClick={deleteLink}>
        DELETE LINK
      </Button>
      <Button variant="contained" onClick={deleteNode}>
        DELETE BUTTON
      </Button>
    </>
  );
}
