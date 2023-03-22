import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import installationOrderAPI from "./installationOrderAPI"
import { initFiles } from "../../utils/utils"

const initialState = {
    installationOrders: [],
    totalCount: 0,
    installationOrder: {},
    users: [],
    files: [],
    isLoading: false,
    error: '',
}

export const getInstallationOrders = createAsyncThunk(
    'installationOrder/getInstallationOrders',
    async(queryParams, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = await installationOrderAPI.getInstallationOrders(queryParams, token)
            return data
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTotalCount = createAsyncThunk(
    'installationOrder/getTotalCount',
    async(queryParams, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = await installationOrderAPI.getTotalCount(queryParams, token)
            return data
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getInstallationOrder = createAsyncThunk(
    'installationOrder/getInstallationOrder',
    async(installationOrderId, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            return await installationOrderAPI.getInstallationOrder(installationOrderId, token)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const closeInstallationOrder = createAsyncThunk(
    'installationOrder/closeInstallationOrder', 
    async (installationOrderId, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            return await installationOrderAPI.closeInstallationOrder(installationOrderId, token)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteInstallationOrder = createAsyncThunk(
    'installationOrder/deleteInstallationOrder', 
    async (installationOrderId, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            return await installationOrderAPI.deleteInstallationOrder(installationOrderId, token)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const setupInstallationOrder = createAsyncThunk(
    'installationOrder/setupInstallationOrder', 
    async (installationOrder, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            return await installationOrderAPI.setupInstallationOrder(installationOrder, token)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const editInstallationOrder = createAsyncThunk(
    'installationOrder/editInstallationOrder', 
    async (installationOrder, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            return await installationOrderAPI.editInstallationOrder(installationOrder, token)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) 
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)



export const installationOrderSlice = createSlice({
    name: 'installationOrder',
    initialState,
    reducers: {

    },
    extraReducers:(builder) =>{
        builder
            // reducers for getInstallationOrders
            .addCase(getInstallationOrders.pending, (state) =>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(getInstallationOrders.fulfilled, (state, action) =>{
                state.isLoading = false
                state.installationOrders = action.payload
            })
            .addCase(getInstallationOrders.rejected, (state, action)=>{
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
                state.totalCount = action.payload.totalCount
            })
            .addCase(getTotalCount.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload
            })
            //reducers for getInstallationOrder
            .addCase(getInstallationOrder.pending, (state) =>{
                state.isLoading = true
                state.error = ''
            })
            .addCase(getInstallationOrder.fulfilled, (state, action) =>{
                state.isLoading = false
                state.installationOrder = action.payload.installationOrder
                state.users = action.payload.users
                state.files = initFiles(action.payload.installationOrder.installationOrderNumber, action.payload.files)
            })
            .addCase(getInstallationOrder.rejected, (state, action)=>{
                state.isLoading = false
                state.error = action.payload
            })
            //reducers for setupInstallationOrder
            .addCase(setupInstallationOrder.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(setupInstallationOrder.fulfilled, (state) =>{
                state.isLoading = false
            })
            .addCase(setupInstallationOrder.rejected, (state, action) =>{
                state.isLoading = false
                state.error = action.payload
            })
            //reducers for editInstallationOrder
            .addCase(editInstallationOrder.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(editInstallationOrder.fulfilled, (state) =>{
                state.isLoading = false
            })
            .addCase(editInstallationOrder.rejected, (state, action) =>{
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export default installationOrderSlice.reducer