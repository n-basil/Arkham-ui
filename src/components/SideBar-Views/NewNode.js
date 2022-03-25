import React from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { InputBase } from '@material-ui/core/';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  textField: {
    border: "2px solid #FDE311",
    backgroundColor: '#F2F2F2',
    borderRadius: theme.shape.borderRadius,
    height: '6vh',
    padding: theme.spacing(1),
    margin: '2vh'
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: '#FDE311',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
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


  return (
    <>
      <ArrowBackIcon onClick={() => { props.setSelectedSideView("Default") }} />
      <form>
        <InputBase
          className={classes.textField}
          placeholder="Name"
        />
        <InputBase
          multiline
          rows={7}
          className={classes.textField}
          style={{ height: '20vh' }}
          placeholder="Notes"
        />

        <Typography gutterBottom>Size</Typography>
        <PrettoSlider 
        valueLabelDisplay="auto" 
        aria-label="pretto slider" 
        min={0}
        max={600}
        defaultValue={20} 
        />
      </form>
    </>
  );
}