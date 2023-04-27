import React from "react";
import {
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Table,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API_URL } from "../const.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addAllDepart,
  editCurrDepartment,
  deleteDepartment,
} from "../slice/departmentSlice.js";
import Fab from "@mui/material/Fab";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import AddDepartModal from "./AddDepartModal.js";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DeleteConfirm from "./DeleteConfirm.js";

export default function DepartmentCrud() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [currDeleteDepart, setCurrDeleteDepart] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [detailsSnackBar, setDetailsSnackBar] = useState({
    severity: "",
    msg: "",
  });

  const dispatch = useDispatch();
  const departList = useSelector((state) => state.depart.departList);

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/api/depart/fetchAll", {
        method: "GET",
      });

      const data = await response.json();
      if (response.status === 200) {
        dispatch(addAllDepart(data.departList));
      }
    })();
  }, []);

  // Function's
  const addDepartment = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleEditDepartment = (e, depart) => {
    e.preventDefault();
    dispatch(editCurrDepartment(depart));
    setIsModalOpen(true);
  };

  const handleDeleteDepartment = (e, depart) => {
    e.preventDefault();
    setCurrDeleteDepart(depart);
    setIsSnackBarOpen(true);
  };

  const snackBarhandleDeleteDepart = async () => {
    if (currDeleteDepart !== null) {
      const response = await fetch(API_URL + "/api/depart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: currDeleteDepart._id }),
      });

      if (response.status === 200) {
        dispatch(deleteDepartment(currDeleteDepart._id));
        setCurrDeleteDepart(null);
        setIsSnackBarOpen(false);
      }
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#B7F397" }}>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Salary</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departList.length !== 0 &&
                departList.map((d) => {
                  return (
                    <>
                      <TableRow key={d._id}>
                        <TableCell align="center">
                          {d.department_name}
                        </TableCell>
                        <TableCell align="center">{d.descrpition}</TableCell>
                        <TableCell align="center">{d.salary}</TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <EditIcon
                              sx={{ color: "black" }}
                              onClick={(e) => handleEditDepartment(e, d)}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton>
                            <DeleteIcon
                              sx={{ color: "red" }}
                              onClick={(e) => handleDeleteDepartment(e, d)}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Fab
        variant="extended"
        color="primary"
        style={{ position: "fixed", bottom: 60, right: 60 }}
        onClick={addDepartment}
      >
        <LibraryAddOutlinedIcon sx={{ mr: 1 }} />
        Add Department
      </Fab>

      {/* Modal */}
      <AddDepartModal
        props={{
          isModalOpen,
          setIsModalOpen,
          setOpenSnackBar,
          setDetailsSnackBar,
        }}
      />

      {/* SNACKBAR */}
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

      {/* DELETE CONFIRM SNACKBAR */}
      <DeleteConfirm
        props={{
          isSnackBarOpen,
          setIsSnackBarOpen,
          snackBarhandleDelete: snackBarhandleDeleteDepart,
        }}
      />
    </>
  );
}
