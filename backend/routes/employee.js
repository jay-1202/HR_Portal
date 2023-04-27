const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Route For creating an Employee
router.post("/add", async (req, res) => {
  let success = false;
  try {
    const {
      Firstname,
      Middlename,
      Lastname,
      Gender,
      Phonenumber,
      Email_id,
      Password,
      DOB,
      Address,
      City,
      Pincode,
      Department,
    } = req.body;

    let employee = await Employee.findOne({ Email_id });

    if (employee) {
      return res
        .status(400)
        .send({ success, errors: [{ msg: "Email already Exist" }] });
    }

    employee = await Employee.create({
      Firstname,
      Middlename,
      Lastname,
      Gender,
      Phonenumber,
      Email_id,
      Password,
      DOB,
      Address,
      City,
      Pincode,
      Department,
    });

    success = true;
    res.status(200).send({ success, _id: employee._id });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success, errors: [{ msg: "Internal Server Error" }] });
  }
});

// Route: For Updating a Profile of Employee
router.post("/update", async (req, res) => {
  let success = false;
  try {
    const {
      _id,
      Firstname,
      Middlename,
      Lastname,
      Gender,
      Phonenumber,
      Email_id,
      Password,
      DOB,
      Address,
      City,
      Pincode,
      Department,
    } = req.body;

    if (_id.length !== 24) {
      return res
        .status(400)
        .send({ success, errors: [{ msg: "Bad Request" }] });
    }

    const tempEmployee = {
      Firstname,
      Middlename,
      Lastname,
      Gender,
      Phonenumber,
      Email_id,
      Password,
      DOB,
      Address,
      City,
      Pincode,
      Department,
    };

    const employee = await Employee.findByIdAndUpdate(
      req.body._id,
      tempEmployee
    );

    if (!employee) {
      return res
        .status(400)
        .send({ success, errors: [{ msg: "Invalid Credentials" }] });
    }

    success = true;
    res.status(200).send({ success });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success, errors: [{ msg: "Internal Server Error" }] });
  }
});

// Route for Deleting an Empployee
router.delete("/delete", async (req, res) => {
  let success = false;
  try {
    if (req.body._id.length !== 24) {
      return res
        .status(400)
        .send({ success, errors: [{ msg: "Bad Request" }] });
    }
    const employee = await Employee.findByIdAndDelete(req.body._id);
    if (!employee) {
      return res.status(404).send({ success, errors: [{ msg: "Not Found" }] });
    }

    success = true;
    res.status(200).send({ success });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success, errors: [{ msg: "Internal Server Error" }] });
  }
});

// Route for fetching all employee data
router.get("/fetchAll", async (req, res) => {
  let success = false;
  try {
    const empList = await Employee.find({});
    success = true;
    res.status(200).send({ empList, success });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success, errors: [{ msg: "Internal Server Error" }] });
  }
});

module.exports = router;
