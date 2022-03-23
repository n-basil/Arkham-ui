import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {InputBase} from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../assets/arkham.png";
import "./Login.css";

const useStyles = makeStyles(theme => ({
  root: {}, // a style rule
  label: {}, // a nested style rule
  textField: {
      border: "1px solid #FDE311",
      borderRadius: theme.shape.borderRadius,
      height: "6vh",
      padding: theme.spacing(2)
    },
    button: {
        backgroundColor: "#FDE311"
    }
}));

export default function Login() {
  const classes = useStyles();
  return (
    <Paper className="paper">
      <img src={logo} width="40%" />
      <Card variant="outlined" className="loginCard">
        <InputBase
          className={classes.textField}
          placeholder="Username"
        />
        <InputBase
          className={classes.textField}
          placeholder="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button className={classes.button} variant="contained">LOGIN</Button>
        <a>REGISTER</a>
      </Card>
    </Paper>
  );
}
