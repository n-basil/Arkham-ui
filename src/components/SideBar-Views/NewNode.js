import React from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import WorkspaceContext from "../../context/WorkspaceContext";
import { v4 as uuidv4 } from "uuid";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NativeSelect from "@material-ui/core/NativeSelect";
import { InputBase } from "@material-ui/core/";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#FDE311",
    margin: "2%",
  },

  textField: {
    border: "2px solid #FDE311",
    backgroundColor: "#F2F2F2",
    borderRadius: theme.shape.borderRadius,
    height: "6vh",
    padding: theme.spacing(1),
    margin: "2vh",
  },
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
  const { addNewNode, selectedNode, setNewNode } = useContext(WorkspaceContext);

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
      symbolType: e.target.shape.value,
      size: e.target.size.value
    }
    addNewNode(nodeFromForm)

  
  };
  return (
    <>
      <ArrowBackIcon
        onClick={() => {
          props.setSelectedSideView("Default");
        }}
      />
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <Typography gutterBottom>Name</Typography>
        <InputBase
          name="name"
          className={classes.textField}
          placeholder="Name"
        />
        <Typography gutterBottom>Notes</Typography>
        <InputBase
          name="notes"
          multiline
          rows={7}
          className={classes.textField}
          style={{ height: "20vh" }}
          placeholder="Notes"
        />
        <Typography gutterBottom>Color</Typography>
        <NativeSelect
          name="color"
          className={classes.textField}
          // value={age}
          // onChange={handleChange}
          // input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value={"blue"}>Blue</option>
          <option value={"red"}>Red</option>
          <option value={"yellow"}>Yellow</option>
        </NativeSelect>
        <Typography gutterBottom>Shape</Typography>
        <NativeSelect
          name="shape"
          className={classes.textField}
          placeholder=""
          // value={age}
          // onChange={handleChange}
          // input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value={"circle"}>Circle</option>
          <option value={"cross"}>Cross</option>
          <option value={"diamond"}>Diamond</option>
          <option value={"star"}>star</option>
          <option value={"triangle"}>Triangle</option>
          <option value={"wye"}>Wye</option>
        </NativeSelect>
        <Typography gutterBottom>Size</Typography>
        <PrettoSlider
          name="size"
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          min={0}
          max={1000}
          defaultValue={200}
        />
        <Button 
        type="submit"
        variant="contained" 
        className={classes.button}
        >
          Make Node
        </Button>
      </form>
    </>
  );
}
