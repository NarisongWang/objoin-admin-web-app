import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authAPI from './authAPI'


//get user info & dictionary info from localstorage
const user = JSON.parse(localStorage.getItem('user'))
const dictionary =  JSON.parse(localStorage.getItem('dictionary'))

const initialState = {
    user: user? user:null,
    dictionary: dictionary? dictionary:null,
    isLoading: false,
    error:''
}

export const login = createAsyncThunk(
    'auth/login', 
    async (user, thunkAPI)=>{
        try {
            const data = await authAPI.login(user)
            if(data){
                // save user and dictionary info in browser localStorage
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('dictionary', JSON.stringify(data.dictionary))
            }
            return data
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message)
                            || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user')
            localStorage.removeItem('dictionary')
            state.user = null
            state.dictionary = null
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.error=''
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.dictionary = action.payload.dictionary
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer