const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

// Route: 1 Create User
router.post(
  "/signup",
  [
    body("Email_id", "Enter valid Email").isEmail(),
    body("Password", "Password should be atleast 5 characters").isLength({
      min: 5,
    }),
    body("Firstname", "Firstname should be atleast 2 charcter").isLength({
      min: 2,
    }),
    body("Lastname", "Lastname should be atleast 2 charcter").isLength({
      min: 2,
    }),
  ],
  async (req, res) => {
    let success = false;
    try {
      let errors = validationResult(req);
      // if error exist
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.errors });
      }

      // Sign up
      // Step- 1 Check user exist or not status code 400 -> Bad Request msg Accounts
      const { Email_id, Password, Firstname, Lastname } = req.body;
      const user = await Employee.findOne({ Email_id });
      if (user) {
        //user exist
        return res
          .status(400)
          .send({ success, errors: [{ msg: "Account already exist" }] });
      }
      // Else Account mongoDB save
      // Encrpt Password
      const salt = await bcryptjs.genSalt(10);
      const encryptpass = bcryptjs.hashSync(Password, salt);
      await Employee.create({
        Email_id,
        Password: encryptpass,
        Firstname,
        Lastname,
      });
      success = true;
      res.status(200).json({ success, msg: "Account Created Successfully" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success, errors: [{ msg: "Account already exist" }] });
    }
  }
);

// Route: 2 Login
router.post(
  "/login",
  [
    body("Email_id", "Enter valid Email").isEmail(),
    body("Password", "Password should be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    try {
      let errors = validationResult(req);
      // if error exist
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.errors });
      }

      // email DB exist
      const { Email_id, Password } = req.body;
      // IF Not exist "Invalid"
      const user = await Employee.findOne({ Email_id });
      // Comapare Encrypted Password
      
      if (!user) {
        //user not exist
        return res
        .status(400)
        .send({ success, errors: [{ msg: "Invalid Credentials" }] });
      }
      const comparePass = await bcryptjs.compare(Password, user.Password);
      if(!comparePass) {
        return res
        .status(400)
        .send({ success, errors: [{ msg: "Invalid Credentials" }] });
      }
      success = true;
      res
        .status(200)
        .send({ success, msg: "Login Successfully", Is_admin: user.Is_admin });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success, errors: [{ msg: "Internal Server Error" }] });
    }
  }
);

module.exports = router;
