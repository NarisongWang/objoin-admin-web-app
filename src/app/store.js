import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import installationOrderReducere from '../features/installationOrder/installationOrderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    installationOrder: installationOrderReducere,
  }
})