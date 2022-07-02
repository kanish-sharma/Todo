import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContentText } from "@mui/material";
import Button from "@mui/material/Button"
import React from "react";

const AlertDialog = (props) => {
    const handleClose =(res) => {
        props.close(res);
    }
    return (
        <div>
            <Dialog
            open = {props.open}
            aria-labelledby = "alert-dialog-title"
            aria-describedby = "alert-dialog-description"
            >
                <DialogTitle id = "alert-dialog-title">
                    You are going to delete selected todo: {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id = "aert-dialog-description">
                        This action is irreversible and task will be deleted forever.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick = {() => handleClose(false)}>Disagree</Button>
                    <Button onClick = {() => handleClose(true)} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default AlertDialog;
