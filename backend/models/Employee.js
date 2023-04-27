const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Middlename: {
    type: String,
    // required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    // required: true,
  },
  Phonenumber: {
    type: Number,
    // required: true,
  },
  Email_id: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    // required: true,
  },
  Address: {
    type: String,
    // required: true,
  },
  City: {
    type: String,
    // required: true,
  },
  Pincode: {
    type: Number,
    // required: true,
  },
  Department: {
    type: String,
  },
  Is_admin: {
    type: Boolean,
    default: false,
  }
});
module.exports=mongoose.model("Employee", employeeSchema);