import { Graph } from "react-d3-graph";
import { useEffect, useContext } from "react";
import AppContext from "../context/AppContext";

import { v4 as uuidv4 } from "uuid";
import { useKeycloak } from "@react-keycloak/web";

import './Graph.css'

export default function Workspace(props) {
  let {
    selectedNode, setSelectedNode,
    newNode, setNewNode,
    nodes, setNodes,
    links, setLinks,
    selectedLink, setSelectedLink,
    getAllNodesAndLinks,
  } = useContext(AppContext);

  const { keycloak } = useKeycloak();


  // graph payload (with minimalist structure)
  let data = {
    nodes: nodes,
    links: links,
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

  const addNewNodeToDB = (uuid, nodeToAdd) => {
    var myHeaders = new Headers();
    myHeaders.append("id", uuid);
    myHeaders.append("name", nodeToAdd.name);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: nodeToAdd,
      redirect: "follow",
    };

    fetch("http://localhost:6969/node", requestOptions)
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
    myHeaders.append("id", nodeId)

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:6969/node", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("GET NODE SUCCESS");
        console.log("data: ", data);
        setSelectedNode(data[0]);
        //setTimeout(getAllNodesAndLinks(), 500);
      })
      .catch((error) => console.log("GET NODE ERROR: ", error));
  };

  const updateNode = (nodeId, update) => {
    var myHeaders = new Headers();
    myHeaders.append("id", nodeId)
    myHeaders.append("update", update) //update needs to be following format: {param: paramValue}

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
    myHeaders.append("update", update) //update needs to be following format: {param: paramValue}

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

  // PROGRAM FUNCTIONS

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "#FDE311",
      size: 500,
      highlightStrokeColor: "#1E90FF",
      labelProperty: "name",
    },
    link: {
      highlightColor: "#1E90FF",
      color: '#333333',
      strokeWidth: 2,
    },
  };

  const onClickNode = function (nodeId) {
    getNode(nodeId);
    props.handleDrawerOpen()
  };

  const onMouseOverNode = function (nodeId) {
    // window.alert(`Mouse over node ${nodeId}`);
    // console.log('hover')
  };

  const onClickLink = function (src, tgt) {
    setSelectedLink({ source: src, target: tgt });
    //console.log("selected link source: ", selectedLink.source)
  };

  const handeNewNodeChange = function (e) {
    let target = e.target;
    let name = target.name;
    setNewNode({ [name]: target.value });
  };

  const newAddNode = function () {
    let newId = uuidv4();
    setNodes((nodes) => [...nodes, { id: newId, ...newNode }]);
    addNewNodeToDB(newId, newNode);
    setLinks((links) => [...links, { source: selectedNode, target: newId }]);
    addNewLinkToDB(selectedNode, newId);
  };

  // useEffect(() => {
  //   getAllNodesAndLinks();
  //   // if (selectedNode) {
  //   //   selectedNode.color = "#FF0000";
  //   // }
  // }, []);

  // DON'T DELETE THIS USE EFFECT. It's doing something, and we don't know what.
  useEffect(() => {
    console.log("Selected Node Name: ", selectedNode.name);

    // selectedNode.name? console.log("Selected Node Note: ", selectedNode.name) : console.log('no node selected')

  }, [onClickNode]);

  useEffect(() => {
    console.log("Selected Link: ", selectedLink);
  }, [selectedLink]);

  return (
    // <div class="canvas">
    <Graph
      id="graph-id" // id is mandatory
      data={data}
      config={myConfig}
      onMouseOverNode={onMouseOverNode}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
      onClickGraph={props.handleDrawerClose}
    />
  );
}
