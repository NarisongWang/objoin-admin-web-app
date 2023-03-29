import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import checkListAPI from './checkListAPI'

const initialState = {
    checkList:[],
    isLoading: false,
    error:''
}

export const getCheckList = createAsyncThunk(
    'checkList/getCheckList',
    async(_, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = checkListAPI.getCheckList(token)
            return data
        } catch (err) {
            const message =  (err.response && err.response.data && err.response.data.message)
                             || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateCheckList = createAsyncThunk(
    'checkList/updateCheckList',
    async(checkList, thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.user.token
            const data = checkListAPI.updateCheckList(checkList, token)
            return data
        } catch (err) {
            const message =  (err.response && err.response.data && err.response.data.message)
                             || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const checkListSlice = createSlice({
    name: 'checkList',
    initialState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder
            //reducers for getCheckList
            .addCase(getCheckList.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getCheckList.fulfilled, (state,action)=>{
                state.checkList = action.payload
                state.isLoading = false
            })
            .addCase(getCheckList.rejected, (state,action)=>{
                state.error = action.payload
                state.isLoading = false
            })
            //reducers for updateCheckList
            .addCase(updateCheckList.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(updateCheckList.fulfilled, (state,action)=>{
                state.checkList = action.payload
                state.isLoading = false
            })
            .addCase(updateCheckList.rejected, (state,action)=>{
                state.error = action.payload
                state.isLoading = false
            })
    }
})


export default checkListSlice.reducer