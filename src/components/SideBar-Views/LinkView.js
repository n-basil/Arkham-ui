import React from "react";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import WorkspaceContext from "../../context/WorkspaceContext";

import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { InputBase } from "@material-ui/core/";
import Divider from "@material-ui/core/Divider";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';

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
        height: '4vw',
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
    },
    button: {
        marginLeft: '1vh'
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

export default function LinkView(props) {
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
        editLink,
        selectedLink, setSelectedLink,
        selectedNodeLinks, setSelectedNodeLinks } = useContext(WorkspaceContext);

    let [addLinkValue, setAddLinkValue] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault()
        // let newId = uuidv4();
        console.log('target: ', e.target.notes.value)
        console.log("submit")
        const linkFromForm = {
            source: selectedLink.source,
            target: selectedLink.target,
            notes: e.target.notes.value,
            color: e.target.color.value,
            type: e.target.type.value,
            strokeWidth: e.target.strokeWidth.value
        }
        editLink(linkFromForm)
    };
    const deleteLinkHandle = (src, tgt) => {
        deleteLink(src, tgt)
    }

    console.log('linkview: ', selectedLink)
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
                {/* {selectedLink?  */}
                <Typography color="textSecondary" component="h5" variant="h5">
                    Link from {selectedLink.sourceName} to {selectedLink.targetName}
                </Typography>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">Notes:</Typography>
                    <InputBase
                        name="notes"
                        defaultValue={selectedLink.notes}
                        multiline
                        rows={7}
                        className={classes.textField}
                        style={{ height: "20vh" }}
                    />
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">Color:</Typography>
                    <Select
                        name="color"
                        defaultValue={selectedLink.color}
                        className={classes.textField}
                        displayEmpty
                        disableUnderline
                    >
                        <MenuItem value={"yellow"}>Yellow</MenuItem>
                        <MenuItem value={"red"}>Red</MenuItem>
                        <MenuItem value={"blue"}>Blue</MenuItem>
                        <MenuItem value={"Green"}>Green</MenuItem>
                    </Select>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">Type:</Typography>
                    <Select
                        name="type"
                        defaultValue={selectedLink.type}
                        className={classes.textField}
                        disableUnderline
                    >
                        <MenuItem value={"STRAIGHT"}>Straight</MenuItem>
                        <MenuItem value={"CURVE_SMOOTH"}>Curve Smooth</MenuItem>
                        <MenuItem value={"CURVE_FULL"}>Curve Full</MenuItem>
                    </Select>
                    <Typography gutterTop variant="body2" color="textSecondary" component="p">Stroke Width:</Typography>
                    <PrettoSlider
                        name="strokeWidth"
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        min={.5}
                        max={3}
                        defaultValue={selectedLink.size ? selectedLink.size : 1.5}
                    />
                    <div className={classes.formButtons}>
                        <Button
                            onClick={() => {
                                deleteLinkHandle(selectedLink.source, selectedLink.target)
                            }}
                            variant="contained"
                            style={{ backgroundColor: "red" }}
                        >
                            Delete
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.button}
                            style={{ backgroundColor: "#FDE311" }}
                        >
                            Edit
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
