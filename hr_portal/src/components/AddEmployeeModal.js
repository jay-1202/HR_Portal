import React from "react";
import { Modal, Typography, Box, Container } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { useState, useEffect } from "react";
import { API_URL } from "../const.js";
import {
  addEmployee,
  clearCurrEmployee,
  editEmpList,
} from "../slice/employeeSlice.js";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function AddEmployeeModal({ props }) {
  const dispatch = useDispatch();
  const currEmployee = useSelector((state) => state.employee.currEmployee);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  };
  const {
    isModalOpen,
    setIsModalOpen,
    isEdit,
    setOpenSnackBar,
    setDetailsSnackBar,
  } = props;
  const [input, setInput] = useState(currEmployee);
  const [departList, setDepartList] = useState([]);

  useEffect(() => {
    setInput(currEmployee);
  }, [currEmployee]);

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/api/depart/fetchAll", {
        method: "GET",
      });

      const data = await response.json();
      if (response.status === 200) {
        setDepartList(data.departList);
      }
    })();
  }, []);

  // Function' s
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (input._id === "") {
      // Add employee
      const response = await fetch(API_URL + "/api/emp/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (response.status === 200) {
        const tempObj = {
          ...input,
          _id: data._id,
        };

        dispatch(addEmployee(tempObj));
        dispatch(clearCurrEmployee());
        setOpenSnackBar(true);
        setIsModalOpen(false);
        setDetailsSnackBar({
          severity: "success",
          msg: "Employee Added Successfully"
        })
      } else {
        alert(data[0].msg);
      }
    } else {
      // Edit Employee
      const response = await fetch(API_URL + "/api/emp/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(editEmpList(input));
        dispatch(clearCurrEmployee());
        setOpenSnackBar(true);
        setIsModalOpen(false);
        setDetailsSnackBar({
          severity: "success",
          msg: "Employee Edited Successfully"
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
            {isEdit ? "Edit" : "Add New"} Employee
          </Typography>

          <Box
            style={{
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  sx={{ width: "100%" }}
                  id="standard-basic"
                  label="First Name"
                  variant="outlined"
                  name="Firstname"
                  value={input.Firstname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  label="Middle Name"
                  variant="outlined"
                  name="Middlename"
                  value={input.Middlename}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="outlined"
                  name="Lastname"
                  value={input.Lastname}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  label="Phonenumber"
                  variant="outlined"
                  name="Phonenumber"
                  value={input.Phonenumber}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  label="Email_id"
                  variant="outlined"
                  name="Email_id"
                  value={input.Email_id}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="password"
                  id="standard-basic"
                  label="Password"
                  variant="outlined"
                  name="Password"
                  value={input.Password}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    pl: 2,
                    py: 1,
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                    textAlign: "start",
                  }}
                >
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender:
                  </FormLabel>
                  <RadioGroup
                    row
                    name="Gender"
                    value={input.Gender}
                    onChange={handleChange}
                    style={{ display: "inline-block", marginLeft: 12 }}
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Male"
                      value="Male"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Female"
                      value="Female"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Other"
                      value="Other"
                    />
                  </RadioGroup>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Container
                  sx={{
                    py: 1.62,
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    DOB :
                  </FormLabel>
                  <TextField
                    type="date"
                    id="standard-basic"
                    variant="standard"
                    name="DOB"
                    value={input.DOB}
                    onChange={handleChange}
                  />
                </Container>
              </Grid>
              <Grid item xs={12}>
                <div style={{ textAlign: "center" }}>
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    id="standard-basic"
                    label="Address"
                    variant="outlined"
                    name="Address"
                    value={input.Address}
                    onChange={handleChange}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  label="City"
                  variant="outlined"
                  name="City"
                  value={input.City}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  label="Pincode"
                  variant="outlined"
                  type="tel"
                  name="Pincode"
                  value={input.Pincode}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  labelId="my-select-label"
                  select
                  fullWidth
                  label="Department"
                  value={input.Department}
                  name="Department"
                  onChange={handleChange}
                  style={{ textAlign: "start" }}
                >
                  {departList.length !== 0 &&
                    departList.map((depart) => {
                      return (
                        <MenuItem
                          value={depart.department_name}
                          key={depart.department_name}
                        >
                          {depart.department_name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <Button
                  sx={{ width: "60%" }}
                  variant="contained"
                  startIcon={<LibraryAddOutlinedIcon />}
                  onClick={handleAddEmployee}
                >
                  {isEdit ? "Save" : "Add"} Employee
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  sx={{ width: "60%" }}
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    dispatch(clearCurrEmployee());
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
