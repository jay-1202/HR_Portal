import { useState, useEffect } from "react";
import { API_URL } from "../const.js";
import {
  Card,
  CardContent,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableContainer,
} from "@mui/material";

export default function EmployeeList() {
  const [emplyoeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "/api/emp/fetchAll", {
        method: "GET",
      });
      const data = await response.json();
      setEmployeeList(data.empList);
    })();
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#B7F397" }}>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Phonenumber</TableCell>
                  <TableCell align="center">Email_id</TableCell>
                  <TableCell align="center">DOB</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emplyoeeList.map((emp) => {
                  return (
                    <TableRow key={emp.id}>
                      <TableCell align="center">{emp.Firstname}{emp.Middlename}{emp.Lastname}</TableCell>
                      <TableCell align="center">{emp.Gender}</TableCell>
                      <TableCell align="center">{emp.Phonenumber}</TableCell>
                      <TableCell align="center">{emp.Email_id}</TableCell>
                      <TableCell align="center">
                        {emp.DOB && emp.DOB.split("T")[0]}
                      </TableCell>
                      <TableCell align="center">{emp.Address},{emp.City} - {emp.Pincode}</TableCell>
                      <TableCell align="center">{emp.Department}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
