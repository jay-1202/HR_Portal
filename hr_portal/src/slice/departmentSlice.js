import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const departSlice = createSlice({
  name: "depart",
  initialState: {
    departList: [],
    currDepartment: {
      _id: "",
      department_name: "",
      descrpition: "",
      salary: "",
    },
  },
  reducers: {
    addAllDepart: (state, action) => {
      state.departList = action.payload;
    },
    addDepartment: (state, action) => {
      state.departList = [...state.departList, action.payload];
    },
    editCurrDepartment: (state, action) => {
      state.currDepartment = action.payload;
    },
    editDepartList: (state, action) => {
      const deepCopy = _.cloneDeep(state.departList);
      // Find Index for Edited Department
      const index = deepCopy.findIndex(
        (depart) => depart._id === action.payload._id
      );
      // Index === -1 Element Not found
      if (index !== -1) {
        deepCopy[index] = action.payload;
        state.departList = deepCopy;
      }
    },
    clearCurrDepartment: (state) => {
      state.currDepartment = {
        _id: "",
        department_name: "",
        descrpition: "",
        salary: "",
      };
    },
    deleteDepartment: (state, action) => {
      state.departList = state.departList.filter((depart) => {
        return depart._id !== action.payload;
      });
    },
  },
});

export const {
  addAllDepart,
  addDepartment,
  editCurrDepartment,
  editDepartList,
  clearCurrDepartment,
  deleteDepartment,
} = departSlice.actions;
export default departSlice.reducer;
