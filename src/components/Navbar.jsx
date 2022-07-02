import React from 'react';
import {NavLink} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import GradingIcon from "@mui/icons-material/Grading";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import { makeStyles} from "@material-ui/styles";

const useStyle = makeStyles(() => ({
    button : {
        "&:active":{
            backgroundColor: "purple"
        },
    }
}));

const Navbar = (props) => {
    const classes = useStyle();
    const logout = () => {
        sessionStorage.clear();
    }
  return (
    <Box sx = {{flexGrow : 1}}>
        <AppBar position = "static" color = "default" style = {{backgroundColor : "#fdc306"}}>
            <Toolbar>
                <GradingIcon/>
                <Typography variant = "h6" component = "div" sx = {{flexGrow: 1}}>Todo-List</Typography>
                {props.loggedIn ? 
                <>
                <Button className = {classes.button} component= {NavLink} to= "/home">Todo list</Button>
                <Button className = {classes.button} component= {NavLink} to= "/chart">Show Chart</Button>
                <Button className = {classes.button} component= {NavLink} to= "/add">Add Todo</Button>
                <Button className = {classes.button} component= {NavLink} to= "/" onClick = {() => logout()}>Logout</Button>
                </>: null}
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Navbar