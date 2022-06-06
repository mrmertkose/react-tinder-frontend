import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import activityService from "./activityService";
const initialState = {
    activity: null,
    match : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Find User
export const findUser = createAsyncThunk(
    'findUser',
    async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await activityService.findUser(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

//User Activity
export const userActivity = createAsyncThunk(
    'userActivity',
    async (postDataForm, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await activityService.userActivity(postDataForm,token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    });


export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        activityReset: (state) => {
            state.activity = null;
            state.match = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(findUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.activity = action.payload
            })
            .addCase(findUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(userActivity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userActivity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.match = action.payload
            })
            .addCase(userActivity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
});

export const {activityReset} = activitySlice.actions
export default activitySlice.reducer