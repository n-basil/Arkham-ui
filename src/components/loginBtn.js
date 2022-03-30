import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { mergeClasses } from '@material-ui/styles';
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: "#FDE311"
    }
}));


export default function LoginBtn () {
    const { keycloak } = useKeycloak();
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div >
        {/* if user is not authenticated, prompt for login */}
        {!keycloak.authenticated && (
          <Button
            type="button"
            className={classes.button}

            onClick={() => keycloak.login()}
          >
            Authenticate
          </Button>
        )}
         {/* If the user is logged in, show a button with the username */}
        {!!keycloak.authenticated && (
          <Button
            type="button"
            className={classes.button}
            onClick={() => keycloak.logout()}
          >
            Logout ({keycloak.tokenParsed.preferred_username})
          </Button>
        )}
      </div>
    );
}