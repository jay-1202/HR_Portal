const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentSchema = new Schema({
  department_name: {
    type: String,
    required: true,
  },
  descrpition: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Department", departmentSchema);
