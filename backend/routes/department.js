const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// Route 1 For adding Department
router.post("/add", async (req, res) => {
  let success = false;
  try {
    let { department_name, descrpition, salary } = req.body;
    let tempDepart = await Department.findOne({
      department_name: department_name.toUpperCase(),
    });
    if (tempDepart) {
      return res
        .status(400)
        .send({ success, errors: [{ msg: "Department Already Exist" }] });
    }

    tempDepart = await Department.create({
      department_name: department_name.toUpperCase(),
      descrpition,
      salary,
    });

    success = true;
    return res.status(200).send({ success, _id: tempDepart._id });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success, errors: [{ msg: "Internal Server Error" }] });
  }
});

// Route 2 For Editing a department
router.post("/update", async (req, res) => {
  let success = false;
  try {
    const { _id, department_name, descrpition, salary} =
      req.body;

    if (_id.length !== 24) {
      return res
        .status(400)
        .send({ success, errors: [{ msg: "Bad Request" }] });
    }

    const tempDepartobj = {
      department_name: department_name.toUpperCase(),
      descrpition,
      salary,
    };

    const tempDepart = await Department.findByIdAndUpdate(_id, tempDepartobj);

    if (!tempDepart) {
      return res
        .status(404)
        .send({ success, errors: [{ msg: "Employee Not Found" }] });
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

// Route 3 Delete a Department
router.delete("/delete", async (req, res) => {
  let success = false;
  try {
    if (req.body._id.length !== 24) {
      return res
        .status(400)
        .send({ success, errors: [{ msg: "Bad Request" }] });
    }
    const tempDepart = await Department.findByIdAndDelete(req.body._id);
    if (!tempDepart) {
        return res.status(404).send({success, errors: [{ msg: "Department Not Found" }]});
    }

    success = true;
    res.status(200).send({success});
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success, errors: [{ msg: "Internal Server Error" }] });
  }
});

// Route 4 Fetch All Department
router.get("/fetchAll", async (req, res) => {
    let success = false;
    try{
        const departList = await Department.find({});
        success = true;
        res.status(200).send({ success, departList });
    } catch (err) {
        console.log(err);
        res
          .status(500)
          .send({ success, errors: [{ msg: "Internal Server Error" }] });
      }
})

module.exports = router;
