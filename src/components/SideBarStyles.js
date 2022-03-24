import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

export default function AppStyles() {
    const theme = useTheme();
    const useStyles = makeStyles((theme) => ({
        root: {
          display: "flex",
        },
        // appBar: {
        //   transition: theme.transitions.create(['margin', 'width'], {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        //   }),
        // },
        appBarShift: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        drawer: {
          width: drawerWidth,
          flexShrink: 0,
          
        },
        drawerPaper: {
          width: drawerWidth,
        },
        drawerHeader: {
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(0, 1),
          // necessary for content to be below app bar
          ...theme.mixins.toolbar,
          justifyContent: "flex-end",
        },
        content: {
          flexGrow: 1,
          padding: theme.spacing(3),
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: -drawerWidth,
        },
        contentShift: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      }));
      const classes = useStyles();
      return (
        <AppContext.Provider value={classes}>
        </AppContext.Provider > 
      )
}