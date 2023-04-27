import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import AddEmployeeModal from "./AddEmployeeModal";
import {
  Card,
  CardContent,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableContainer,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_URL } from "../const.js";
import {
  addAllEmployee,
  editCurrEmployee,
  deleteEmployee,
} from "../slice/employeeSlice.js";
import DeleteConfirm from "./DeleteConfirm";
import Fab from "@mui/material/Fab";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function EmployeeCrud() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [detailsSnackBar, setDetailsSnackBar] = useState({
    severity: "",
    msg: "",
  });
  const [currDeleteEmp, setCurrDeleteEmp] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const empList = useSelector((state) => state.employee.empList);

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/api/emp/fetchAll", {
        method: "GET",
      });
      const data = await response.json();
      dispatch(addAllEmployee(data.empList));
    })();
  }, []);

  function addEmployee(e) {
    e.preventDefault();
    setIsEdit(false);
    setIsModalOpen(true);
  }

  const handleEditEmployee = (e, emp) => {
    e.preventDefault();
    dispatch(editCurrEmployee(emp));
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (e, emp) => {
    e.preventDefault();
    setCurrDeleteEmp(emp);
    setIsSnackBarOpen(true);
  };

  const snackBarhandleDeleteEmp = async () => {
    if (currDeleteEmp !== null) {
      const response = await fetch(API_URL + "/api/emp/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: currDeleteEmp._id }),
      });

      if (response.status === 200) {
        dispatch(deleteEmployee(currDeleteEmp._id));
        setCurrDeleteEmp(null);
        setIsSnackBarOpen(false);
      }
    }
  };

  return (
    <div>
      {/* Employee List  */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#B7F397" }}>
                  <TableCell align="center">Firstname</TableCell>
                  <TableCell align="center">Middlename</TableCell>
                  <TableCell align="center">Lastname</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Phonenumber</TableCell>
                  <TableCell align="center">Email_id</TableCell>
                  <TableCell align="center">DOB</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">City</TableCell>
                  <TableCell align="center">Pincode</TableCell>
                  <TableCell align="center">Department</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {empList.length !== 0 &&
                  empList.map((emp) => {
                    return (
                      <TableRow>
                        {/* <TableCell align="center">{emp._id}</TableCell> */}
                        <TableCell align="center">{emp.Firstname}</TableCell>
                        <TableCell align="center">{emp.Middlename}</TableCell>
                        <TableCell align="center">{emp.Lastname}</TableCell>
                        <TableCell align="center">{emp.Gender}</TableCell>
                        <TableCell align="center">{emp.Phonenumber}</TableCell>
                        <TableCell align="center">{emp.Email_id}</TableCell>
                        <TableCell align="center">
                          {emp.DOB && emp.DOB.split("T")[0]}
                        </TableCell>
                        <TableCell align="center">{emp.Address}</TableCell>
                        <TableCell align="center">{emp.City}</TableCell>
                        <TableCell align="center">{emp.Pincode}</TableCell>
                        <TableCell align="center">{emp.Department}</TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <EditIcon
                              sx={{ color: "black" }}
                              onClick={(e) => {
                                setIsEdit(true);
                                handleEditEmployee(e, emp);
                              }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <DeleteIcon
                              sx={{ color: "red" }}
                              onClick={(e) => 
                                {
                                handleDeleteEmployee(e, emp)}}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Modal */}

      <AddEmployeeModal
        props={{
          isModalOpen,
          setIsModalOpen,
          isEdit,
          setOpenSnackBar,
          setDetailsSnackBar,
        }}
      />

      {/* SnackBar */}
      <DeleteConfirm
        props={{
          isSnackBarOpen,
          setIsSnackBarOpen,
          snackBarhandleDelete: snackBarhandleDeleteEmp,
        }}
      />

      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => {
          setOpenSnackBar(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnackBar(false);
          }}
          severity={detailsSnackBar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {detailsSnackBar.msg}
        </Alert>
      </Snackbar>

      {/* FAB */}
      <Fab
        variant="extended"
        color="primary"
        style={{ position: "fixed", bottom: 60, right: 60 }}
        onClick={addEmployee}
      >
        <LibraryAddOutlinedIcon sx={{ mr: 1 }} />
        Add Employee
      </Fab>
    </div>
  );
}
