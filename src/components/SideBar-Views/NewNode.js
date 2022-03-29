import React from "react";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import WorkspaceContext from "../../context/WorkspaceContext";

import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NativeSelect from "@material-ui/core/NativeSelect";
import { InputBase } from "@material-ui/core/";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    height: "6vh",
    width: "100%",
    padding: theme.spacing(1),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "flex-start",
  },
  drawerContent: {
    padding: theme.spacing(1)
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

export default function NewNode(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { handleDrawerClose, addNewNode, setNodes, setLinks, nodes, links } = useContext(WorkspaceContext);
  let [newNode, setNewNode] = useState({ id: uuidv4() });
  const handleSubmit = (e) => {
    e.preventDefault()
    let newId = uuidv4();
    console.log('target: ', e.target.notes.value)
    console.log("submit")
    const nodeFromForm = {
      id: newId,
      name: e.target.name.value,
      notes: e.target.notes.value,
      color: e.target.color.value,
      symbolType: e.target.symbolType.value,
      size: e.target.size.value
    }
    addNewNode(nodeFromForm)
  };

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
      <form
        onSubmit={(e) => { handleSubmit(e) }}
        className={classes.drawerContent}
      >
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">Name:</Typography>
        <InputBase
          name="name"
          className={classes.textField}
          placeholder="Alpha"
        />
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">Notes:</Typography>
        <InputBase
          name="notes"
          multiline
          rows={7}
          className={classes.textField}
          style={{ height: "20vh" }}
          placeholder="Always take notes..."
        />
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">Color:</Typography>
        <Select
          name="color"
          className={classes.textField}
          displayEmpty
          disableUnderline
        >
          <MenuItem alue={"yellow"}>Yellow</MenuItem>
          <MenuItem value={"red"}>Red</MenuItem>
          <MenuItem value={"blue"}>Blue</MenuItem>
          <MenuItem value={"Green"}>Green</MenuItem>
        </Select>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">Shape:</Typography>
        <Select
          name="symbolType"
          className={classes.textField}
          displayEmpty
          disableUnderline
        >
          <MenuItem alue={"circle"}>Circle</MenuItem>
          <MenuItem value={"cross"}>Cross</MenuItem>
          <MenuItem value={"diamond"}>Diamond</MenuItem>
          <MenuItem value={"star"}>Star</MenuItem>
          <MenuItem value={"triangle"}>Triangle</MenuItem>
          <MenuItem value={"wye"}>Wye</MenuItem>
        </Select>
        <Typography gutterTop variant="body2" color="textSecondary" component="p">Size:</Typography>
        <PrettoSlider
          name="size"
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          min={0}
          max={2500}
          defaultValue={500}
        />
        <div className={classes.formButtons}>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#FDE311" }}
          >
            Add Node
          </Button>
        </div>
      </form>
    </>
  );
}
