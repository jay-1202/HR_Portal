import React from "react";
import { Modal, Typography, Box, Container } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { useState, useEffect } from "react";
import { API_URL } from "../const.js";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import {
  addDepartment,
  editDepartList,
  clearCurrDepartment,
} from "../slice/departmentSlice.js";

export default function AddDepartModal({ props }) {
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 802,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  };
  const currDepartment = useSelector((state) => state.depart.currDepartment);
  const { isModalOpen, setIsModalOpen, setOpenSnackBar, setDetailsSnackBar } = props;
  const [input, setInput] = useState(currDepartment);

  useEffect(() => {
    setInput(currDepartment);
  }, [currDepartment]);

  // Function's
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "department_name") {
      setInput({
        ...input,
        [name]: value.toUpperCase(),
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (input._id === "") {
      // For Adding Employee
      const response = await fetch(API_URL + "/api/depart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (response.status === 200) {
        const tempObj = {
          _id: data._id,
          ...input,
        };
        
        dispatch(addDepartment(tempObj));
        dispatch(clearCurrDepartment());
        setOpenSnackBar(true);
        setIsModalOpen(false);
        setDetailsSnackBar({
          severity: "success",
          msg: "Department Added Successfully"
        })
      }else {
        alert(data.errors[0].msg)
      }
    } else {
      // For Editing Employee
      const response = await fetch(API_URL + "/api/depart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(editDepartList(input));
        dispatch(clearCurrDepartment());
        setOpenSnackBar(true);
        setIsModalOpen(false);
        setDetailsSnackBar({
          severity: "success",
          msg: "Department Edited Successfully"
        })
      } else {
        alert(data.errors[0].msg);
      }
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ position: "relative" }}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            align="center"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontStyle: "italic",
              textDecoration: "underline",
            }}
          >
            Add Department
          </Typography>

          <Box
            style={{
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="standard-basic"
                  label="Department Name"
                  variant="outlined"
                  name="department_name"
                  value={input.department_name}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  id="standard-basic"
                  label="Salary"
                  variant="outlined"
                  name="salary"
                  value={input.salary}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>

              <Grid item xs={12}>
                <div style={{ textAlign: "center" }}>
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    id="standard-basic"
                    label="Description"
                    variant="outlined"
                    name="descrpition"
                    value={input.descrpition}
                    onChange={handleChange}
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <Button
                  sx={{ width: "60%" }}
                  variant="contained"
                  startIcon={<LibraryAddOutlinedIcon />}
                  onClick={handleAddDepartment}
                >
                  Add Department
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  sx={{ width: "60%" }}
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    dispatch(clearCurrDepartment());
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
