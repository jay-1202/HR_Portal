import { configureStore} from '@reduxjs/toolkit';
import employeeReducer from '../slice/employeeSlice.js';
import departReducer from '../slice/departmentSlice.js';

const store = configureStore({
    reducer: {
        employee: employeeReducer,
        depart: departReducer,
    }
});

export default store;