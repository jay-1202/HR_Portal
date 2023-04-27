const express = require("express");
const app = express();
const port = 5000;
const bodyparser = require("body-parser");
const mongooseconnect = require("./db.js");
const auth = require("./routes/auth.js");
const employee = require("./routes/employee.js");
const depart = require("./routes/department.js")
const cors = require("cors");

mongooseconnect();

app.use(cors());
app.use(bodyparser.json());

app.use("/api/auth", auth);
app.use("/api/emp", employee);
app.use("/api/depart", depart);


app.listen(port, () => {
  console.log("Server Running");
});
