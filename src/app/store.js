import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import installationOrderReducer from '../features/installationOrder/installationOrderSlice'
import salesOrderReducer from '../features/salesOrder/salesOrderSlice'
import employeeReducer from '../features/employee/employeeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    installationOrder: installationOrderReducer,
    salesOrder: salesOrderReducer,
    employee: employeeReducer,
  }
})