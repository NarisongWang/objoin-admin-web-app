import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import salesOrderAPI from "./salesOrderAPI"

const initialState = {
    salesOrders: [],
    totalCount: 0,
    salesOrder: {},
    files:[],
    isLoading:false,
    error:''
}

export const getSalesOrders = createAsyncThunk(
    'salesOrder/getSalesOrders',
    async(queryParams, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = await salesOrderAPI.getSalesOrders(queryParams, token)
            return data
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message)
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTotalCount = createAsyncThunk(
    'salesOrder/getTotalCount' ,
    async(queryParams, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = await salesOrderAPI.getTotalCount(queryParams, token)
            return data[0][''];
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message)
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getSalesOrder = createAsyncThunk(
    'salesOrder/getSalesOrder',
    async(queryParams, thunkAPI)=>{
        try {
            
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message)
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createInstallationOrders = createAsyncThunk(
    'salesOrder/createInstallationOrders' ,
    async(salesOrders, thunkAPI)=>{
        try {

        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message)
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const salesOrderSlice = createSlice({
    name:'salesOrder',
    initialState,
    reducers:{

    },
    extraReducers:(builder) =>{
        builder
            //reducers for getSalesOrders
            .addCase(getSalesOrders.pending,(state)=>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(getSalesOrders.fulfilled, (state, action) =>{
                state.isLoading = false
                state.salesOrders = action.payload
            })
            .addCase(getSalesOrders.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload
            })
            // reducers for getTotalCount
            .addCase(getTotalCount.pending, (state) =>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(getTotalCount.fulfilled, (state, action) =>{
                state.isLoading = false
                state.totalCount = action.payload
            })
            .addCase(getTotalCount.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export default salesOrderSlice.reducer