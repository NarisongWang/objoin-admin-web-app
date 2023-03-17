import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import employeeAPI from "./employeeAPI"

const initialState = {
    employees: [],
    employee: {},
    isLoading: false,
    error:''
}

const getEmployees = createAsyncThunk(
    'employeem/getEmployees',
    async(_, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = employeeAPI.getEmployees(token)
            return data
        } catch (err) {
            const message =  (err.response && err.response.data && err.response.data.message)
                             || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const getEmployee = createAsyncThunk(
    'employeem/getEmployee',
    async(employeeId, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = employeeAPI.getEmployee(employeeId, token)
            return data
        } catch (err) {
            const message =  (err.response && err.response.data && err.response.data.message)
                             || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder
            //reducers for getEmployees
            .addCase(getEmployees.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getEmployees.fulfilled, (state,action)=>{
                state.employees = action.payload
                state.isLoading = false
            })
            .addCase(getEmployees.rejected, (state,action)=>{
                state.error = action.payload
                state.isLoading = false
            })
            //reducers for getEmployee
            .addCase(getEmployee.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getEmployee.fulfilled, (state,action)=>{
                state.employee = action.payload
                state.isLoading = false
            })
            .addCase(getEmployee.rejected, (state,action)=>{
                state.error = action.payload
                state.isLoading = false
            })
    }
})

export default employeeSlice.reducer