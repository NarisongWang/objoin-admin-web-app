import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import employeeAPI from "./employeeAPI"

const initialState = {
    employees: [],
    totalCount: 0,
    employee: {},
    isLoading: false,
    error:''
}

export const getEmployees = createAsyncThunk(
    'employee/getEmployees',
    async(queryParams, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = employeeAPI.getEmployees(queryParams, token)
            return data
        } catch (err) {
            const message =  (err.response && err.response.data && err.response.data.message)
                             || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTotalCount = createAsyncThunk(
    'employee/getTotalCount' ,
    async(queryParams, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = await employeeAPI.getTotalCount(queryParams, token)
            return data[0]['']
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message)
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getEmployee = createAsyncThunk(
    'employee/getEmployee',
    async(employeeId, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = await employeeAPI.getEmployee(employeeId, token)
            return data[0]
        } catch (err) {
            const message =  (err.response && err.response.data && err.response.data.message)
                             || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const activateAccount = createAsyncThunk(
    'employee/activateAccount',
    async(formData, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            return await employeeAPI.activateAccount(formData, token)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const resendEmail = createAsyncThunk(
    'employee/resendEmail',
    async(formData, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            return await employeeAPI.resendEmail(formData, token)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
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
            // reducers for getTotalCount
            .addCase(getTotalCount.pending, (state) =>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(getTotalCount.fulfilled, (state, action) =>{
                state.totalCount = action.payload
            })
            .addCase(getTotalCount.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload
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
            //reducers for activateAccount
            .addCase(activateAccount.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(activateAccount.fulfilled, (state)=>{
                state.isLoading = false
            })
            .addCase(activateAccount.rejected, (state,action)=>{
                state.error = action.payload
                state.isLoading = false
            })
            //reducers for resendEmail
            .addCase(resendEmail.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(resendEmail.fulfilled, (state)=>{
                state.isLoading = false
            })
            .addCase(resendEmail.rejected, (state,action)=>{
                state.error = action.payload
                state.isLoading = false
            })

    }
})

export default employeeSlice.reducer