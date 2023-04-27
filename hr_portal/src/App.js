// import './App.css';
import MiniDrawer from "./components/MiniDrawer.js";
import BasicCard from "./components/BasicCard.js";
import EmployeeList from "./components/EmployeeList.js";
import Login from "./components/Login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoughnutChart from "./components/DoughnutChart.js";
import EmployeeCrud from "./components/EmployeeCrud.js";
import Signup from "./components/Signup.js";
import DepartmentCrud from "./components/DepartmentCrud.js";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/admin"
            element={
              <MiniDrawer
                props={
                  <>
                    <BasicCard />
                    <DoughnutChart />
                    <div>
                      <EmployeeList />
                    </div>
                  </>
                }
              />
            }
          />
          <Route
            path="/ManageEmployees"
            element={
              <MiniDrawer
                props={
                  <>
                    <EmployeeCrud />
                  </>
                }
              />
            }
          />
          <Route
            path="/EmployeeList"
            element={
              <MiniDrawer
                props={
                  <>
                    <EmployeeList />
                  </>
                }
              />
            }
          />

          <Route
            path="/Department"
            element={
              <MiniDrawer
                props={
                  <>
                    <DepartmentCrud />
                  </>
                }
              />
            }
          />

          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}
