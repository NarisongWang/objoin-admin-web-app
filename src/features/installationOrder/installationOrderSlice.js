import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import installationOrderAPI from "./installationOrderAPI"

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
    }
})

export default installationOrderSlice.reducer