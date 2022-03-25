import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {InputBase} from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import logo from "../assets/arkham.png";
import LoginBtn from "../components/loginBtn";
import "./Login.css";

export default function Login() {
  // const classes = useStyles();
  // const theme = useTheme();
  return (
    <Paper className="paper">
      <img data-testid="logo" src={logo} width="40%" />
      <Card variant="outlined" className="loginCard">
        {/* <InputBase
          className={classes.textField}
          placeholder="Username"
        />
        <InputBase
          className={classes.textField}
          placeholder="Password"
          type="password"
          autoComplete="current-password"
        /> */}
        <LoginBtn />
        {/* <Button className={classes.button} variant="contained">LOGIN</Button>
        <a>REGISTER</a> */}
      </Card>
    </Paper>
  );
}
