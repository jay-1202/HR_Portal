import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    empList: [],
    currEmployee: {
      _id: "",
      Firstname: "",
      Middlename: "",
      Lastname: "",
      Gender: "",
      Phonenumber: "",
      Email_id: "",
      Password: "",
      DOB: "",
      Address: "",
      City: "",
      Pincode: "",
      Department: "",
    },
  },
  reducers: {
    addAllEmployee: (state, action) => {
      state.empList = action.payload;
    },
    addEmployee: (state, action) => {
      state.empList = [...state.empList, action.payload];
    },
    editCurrEmployee: (state, action) => {
        const tempDOBArray = action.payload.DOB.split("T");
        const tempDOB = tempDOBArray[0];
        state.currEmployee = {
          ...action.payload,
          DOB: tempDOB,
        };
    },
    editEmpList: (state, action) => {
        const deepCopy = _.cloneDeep(state.empList);
        // Find Index for Edited Department
        const index = deepCopy.findIndex(
          (emp) => emp._id === action.payload._id
        );
        // Index === -1 Element Not found
        if (index !== -1) {
          deepCopy[index] = action.payload;
          state.empList = deepCopy;
        }
      },

    deleteEmployee: (state, action) => {
      state.empList = state.empList.filter((emp) => {
        return emp._id !== action.payload;
      });
    },
    clearCurrEmployee: (state) => {
      state.currEmployee = {
        _id: "",
        Firstname: "",
        Middlename: "",
        Lastname: "",
        Gender: "",
        Phonenumber: "",
        Email_id: "",
        Password: "",
        DOB: "",
        Address: "",
        City: "",
        Pincode: "",
        Department: "",
      };
    },
  },
});

export const {
  addAllEmployee,
  addEmployee,
  editCurrEmployee,
  deleteEmployee,
  clearCurrEmployee,
  editEmpList,
} = employeeSlice.actions;
export default employeeSlice.reducer;