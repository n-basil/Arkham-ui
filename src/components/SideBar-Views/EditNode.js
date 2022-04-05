import React from "react";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import WorkspaceContext from "../../context/WorkspaceContext";

import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { InputBase } from "@material-ui/core/";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import LinkOffIcon from '@material-ui/icons/LinkOff';

const useStyles = makeStyles((theme) => ({
  formButtons: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  textField: {
    border: "2px solid #FDE311",
    backgroundColor: "#F2F2F2",
    borderRadius: theme.shape.borderRadius,
    height: "5vh",
    width: "100%",
    padding: theme.spacing(1),
  },
  label: {
    marginTop: '1vh',
    marginBottom: '1vh'
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    height: '4vw',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
  },
  drawerContent: {
    padding: theme.spacing(1)
  },
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#FF0400",
      opacity: '0.90'
    },
    "&.MuiIconButton-root": {
      padding: ".25vh"
    }
  },
  button: {
    marginLeft: '1vh',
    backgroundColor: "#FDE311"
  },
  divider: {
    marginTop: '1vh',
    marginBottom: '1vh'
  }
}));

const PrettoSlider = withStyles({
  root: {
    color: "#FDE311",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function EditNode(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    deleteLink,
    selectedNode,
    handleDrawerClose,
    addNewNode,
    setSelectedSideView,
    setRender, render,
    links,
    editNode,
    setLinksNotSelected,
    linksNotSelected,
    addNewLinkToDB,
    linkToDelete, setLinkToDelete,
    selectedNodeLinks, setSelectedNodeLinks } = useContext(WorkspaceContext);

  let [addLinkValue, setAddLinkValue] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault()
    // let newId = uuidv4();
    console.log('target: ', e.target.notes.value)
    console.log("submit")
    const nodeFromForm = {
      id: selectedNode.id,
      name: e.target.name.value,
      notes: e.target.notes.value,
      color: e.target.color.value,
      symbolType: e.target.symbolType.value,
      size: e.target.size.value
    }
    editNode(nodeFromForm)
  };
  const deleteLinkHandle = (linkToDelete) => {
    const snapshotLinks = selectedNodeLinks;
    snapshotLinks.splice(snapshotLinks.indexOf(linkToDelete.id), 1);
    deleteLink(selectedNode.id, linkToDelete.id)
    deleteLink(linkToDelete.id, selectedNode.id)
    setSelectedNodeLinks(snapshotLinks)
    setLinksNotSelected([...linksNotSelected, linkToDelete])
  }

  const LinksRender = selectedNodeLinks.map((link) => {
    return (
      <Grid container direction="row" alignItems="center">
        <Grid item className={classes.link}>
          <IconButton
            onClick={() => {
              deleteLinkHandle(link)
            }}
            className={classes.customHoverFocus}
          >
            <LinkOffIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography className={classes.link} variant="body2" color="textSecondary" component="p">
            {link.name}
          </Typography>
        </Grid>
      </Grid>
    )
  })

  const AddLinksRender = linksNotSelected.map((link) => {
    if (link.id !== selectedNode.id) {
      return <MenuItem value={link.id}>{link.name}</MenuItem>
    }
  })

  const handeAddLinkChange = (e) => {
    setAddLinkValue(e.target.value)
  }

  const handleAddLinkSubmit = () => {
    if (addLinkValue) {
      addNewLinkToDB(selectedNode.id, addLinkValue)
    }
  }

  return (
    <>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <div className={classes.backButton}>
        <IconButton>
          <ArrowBackIcon
            fontSize="small"
            onClick={() => {
              props.setSelectedSideView("Default");
            }}
          />
        </IconButton>
      </div>
      <div className={classes.drawerContent}>
        <Typography className={classes.label} variant="body2" component="p">
          Delete Link: {LinksRender}
        </Typography>
        <Typography className={classes.label} variant="body2" component="p">Add Link:</Typography>
        <div className={classes.formButtons}>
          <Select
            name="addLink"
            onChange={(e) => handeAddLinkChange(e)}
            defaultValue={"Select a node..."}
            className={classes.textField}
            displayEmpty
            disableUnderline
          >
            {/* <MenuItem value="" disabled>None</MenuItem> */}
            {AddLinksRender}
          </Select>
          <Button
            onClick={handleAddLinkSubmit}
            variant="contained"
            className={classes.button}
          >
            <AddIcon />
          </Button>
        </div>
        <Divider className={classes.divider}/>
        <form
          onSubmit={(e) => { handleSubmit(e) }}
        >
          <Typography className={classes.label} variant="body2" component="p">Name:</Typography>
          <InputBase
            name="name"
            defaultValue={selectedNode.name}
            className={classes.textField}
          // placeholder={selectedNode.name}
          />
          <Typography className={classes.label} variant="body2" component="p">Notes:</Typography>
          <InputBase
            name="notes"
            defaultValue={selectedNode.notes}
            multiline
            rows={7}
            className={classes.textField}
            style={{ height: "20vh" }}
          // placeholder={selectedNode.notes}
          />
          <Typography className={classes.label} variant="body2" component="p">Color:</Typography>
          <Select
            name="color"
            defaultValue={selectedNode.color}
            className={classes.textField}
            displayEmpty
            disableUnderline
          >
            <MenuItem value={"yellow"}>Yellow</MenuItem>
            <MenuItem value={"red"}>Red</MenuItem>
            <MenuItem value={"blue"}>Blue</MenuItem>
            <MenuItem value={"Green"}>Green</MenuItem>
          </Select>
          <Typography className={classes.label} variant="body2" component="p">Shape:</Typography>
          <Select
            name="symbolType"
            defaultValue={selectedNode.symbolType}
            className={classes.textField}

            disableUnderline
          >
            <MenuItem value={"circle"}>Circle</MenuItem>
            <MenuItem value={"square"}>Square</MenuItem>
            <MenuItem value={"cross"}>Cross</MenuItem>
            <MenuItem value={"diamond"}>Diamond</MenuItem>
            <MenuItem value={"star"}>Star</MenuItem>
            <MenuItem value={"triangle"}>Triangle</MenuItem>
            <MenuItem value={"wye"}>Wye</MenuItem>
          </Select>
          <Typography className={classes.label} variant="body2" component="p">Size:</Typography>
          <PrettoSlider
            name="size"
            // value={selectedNode.size}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            min={100}
            max={2500}
            defaultValue={selectedNode.size ? selectedNode.size : 500}
          />
          <div className={classes.formButtons}>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Edit Node
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
