import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import salesOrderAPI from "./salesOrderAPI"
import { initFiles } from "../../utils/utils"

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
    async(salesOrderId, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = await salesOrderAPI.getSalesOrder(salesOrderId, token)
            return data
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
            const token = thunkAPI.getState().auth.user.token
            const data = await salesOrderAPI.createInstallationOrders(salesOrders, token)
            return data
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
                state.salesOrders = []
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
                state.totalCount = action.payload
            })
            .addCase(getTotalCount.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload
            })
            //reducers for getSalesOrder
            .addCase(getSalesOrder.pending,(state)=>{
                state.isLoading = true
                state.error = ''
                state.salesOrder = {}
            })
            .addCase(getSalesOrder.fulfilled, (state, action) =>{
                state.isLoading = false
                state.salesOrder = action.payload.salesOrder
                state.files = initFiles(action.payload.salesOrder.installationOrderNumber, action.payload.files)
            })
            .addCase(getSalesOrder.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload
            })
            //reducers for createInstallationOrders
            .addCase(createInstallationOrders.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(createInstallationOrders.fulfilled, (state, action)=>{
                state.isLoading = false
                state.salesOrders = updateSalesOrders(state.salesOrders, action.payload)
            })
            .addCase(createInstallationOrders.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload
            })
    }
})

const updateSalesOrders = (salesOrders, newInstallationOrders) =>{
    const newSalesOrders = [...salesOrders]
    for (const installationOrder of newInstallationOrders) {
        let salesOrder = newSalesOrders.find(salesOrder => salesOrder.installationOrderNumber===installationOrder.installationOrderNumber)
        if(salesOrder){
            salesOrder.loaded = true
        }
    }
    return newSalesOrders
}

export default salesOrderSlice.reducer