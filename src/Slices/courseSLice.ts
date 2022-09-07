import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Category, Course} from "../Interfaces/Course";
import courseAPI from "../Services/courseAPI";

interface State {
    course: Course | null,
    categories: Category[],
    errorCategories: string | null,
    errorAddCourse: string
}

const initialState: State = {
    course: null,
    categories: [],
    errorCategories: null,
    errorAddCourse: ""
}

export const addCourse = createAsyncThunk("course/add",
    async (values: any, {rejectWithValue}) => {
        try {
            const data = await courseAPI.addCourse(values);
            return data
        } catch (e) {
            return rejectWithValue(e)
        }
    })
export const getCategories = createAsyncThunk("course/getCategories",
    async (values: string, {rejectWithValue}) => {
        try {
            const data = await courseAPI.getCategories(values);
            return data
        } catch (e) {
            return rejectWithValue(e)
        }
    })
const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // get categories
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.categories = payload
        });
        builder.addCase(getCategories.rejected, (state, {payload}) => state.errorCategories = payload as any);
        // add course
        builder.addCase(addCourse.fulfilled, (state, {payload}) => state.course = payload);
        builder.addCase(addCourse.rejected, (state, {payload}) => state.errorAddCourse = payload as any)
    }
})


export default courseSlice.reducer;
