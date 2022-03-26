import { Graph } from "react-d3-graph";
import { useEffect, useContext, useState } from "react";
import AppContext from "../context/AppContext";
import WorkspaceContext from "../context/WorkspaceContext";

import { v4 as uuidv4 } from "uuid";
import { useKeycloak } from "@react-keycloak/web";

import "./Graph.css";

export default function Workspace(props) {

  let {
    getNode,
    addNewNodeToDB,
    selectedNode,
    setSelectedNode,
    addNewLinkToDB,
    newNode,
    setNewNode,
    nodes,
    setNodes,
    links,
    setLinks,
    selectedLink,
    setSelectedLink,
    getAllNodesAndLinks,
    getNodeSelection,
  } = useContext(WorkspaceContext);

  const { keycloak } = useKeycloak();

  // graph payload (with minimalist structure)
  let data = {
    nodes: nodes,
    links: links,
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
      color: "#333333",
      strokeWidth: 2,
    },
  };

  const onClickNode = function (nodeId) {
    getNodeSelection(nodeId);
    props.handleDrawerOpen();
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

  // useEffect(() => {
  //   getAllNodesAndLinks();
  //   // if (selectedNode) {
  //   //   selectedNode.color = "#FF0000";
  //   // }
  // }, []);

  // DON'T DELETE THIS USE EFFECT. It's doing something, and we don't know what.
  // useEffect(() => {
  //   console.log("Selected Node Name: ", selectedNode.name);

  //   // selectedNode.name? console.log("Selected Node Note: ", selectedNode.name) : console.log('no node selected')
  // }, [onClickNode]);


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
