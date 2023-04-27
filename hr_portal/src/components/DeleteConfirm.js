import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { API_URL } from "../const";
import { useDispatch } from "react-redux";


export default function DeleteConfirm({ props }) {
  const { setIsSnackBarOpen, isSnackBarOpen , snackBarhandleDelete} = props;
  

  // Function
  const handleClose = () => {
    setIsSnackBarOpen(false);
  };

  const handleDeleteEmp = async() => {
    snackBarhandleDelete();
  } 
  return (
      <Snackbar
        color="error"
        open={isSnackBarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleDeleteEmp}>
              Confirm
            </Button>
          }
        >
          Are you sure you want to Delete
        </Alert>
      </Snackbar>
  );
}
