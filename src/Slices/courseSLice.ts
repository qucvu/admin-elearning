import { CourseUpdate } from "./../Interfaces/Course";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category, Course } from "../Interfaces/Course";
import courseAPI from "../Services/courseAPI";

interface State {
  course: Course | null;
  categories: Category[];
  errorCategories: string | null;
  errorAddCourse: string;

  courseList: Course[];
  isCourseListLoading: boolean;
  errorCourseList: string | null;

  searchText: string;

  courseInfo: Course | null;
  isCourseInfoLoading: boolean;
  errorCourseInfo: string | null;

  srcPreview: string;
}

const initialState: State = {
  course: null,
  categories: [],
  errorCategories: null,
  errorAddCourse: "",

  courseList: [],
  isCourseListLoading: false,
  errorCourseList: null,

  searchText: "",

  courseInfo: null,
  isCourseInfoLoading: false,
  errorCourseInfo: null,

  srcPreview: "",
};

export const addCourse = createAsyncThunk(
  "course/add",
  async (values: any, { rejectWithValue }) => {
    try {
      const data = await courseAPI.addCourse(values);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const getCategories = createAsyncThunk(
  "course/getCategories",
  async (values?: string) => {
    try {
      const data = await courseAPI.getCategories(values);
      return data;
    } catch (e) {
      throw e;
      // return rejectWithValue(e);
    }
  }
);
export const getCourseList = createAsyncThunk(
  `course/getCourseList`,
  async (payload?: string) => {
    try {
      const data = await courseAPI.getCourseList(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCourse = createAsyncThunk(
  `course/deleteCourse`,
  async (payload: string) => {
    try {
      await courseAPI.deleteCourse(payload);
    } catch (error) {
      throw error;
    }
  }
);

export const getCourseInfo = createAsyncThunk(
  `course/getCourseInfo`,
  async (payload: string) => {
    try {
      const data = await courseAPI.getCourseInfo(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCourse = createAsyncThunk(
  "movie/updateCourse",
  async (payload: any) => {
    try {
      await courseAPI.updateCourse(payload);
    } catch (error) {
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    handleSearch: (state, { payload }) => {
      state.searchText = payload;
    },
    getSrcPreview: (state, { payload }) => {
      state.srcPreview = payload;
    },
  },
  extraReducers: (builder) => {
    // get categories
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
    builder.addCase(
      getCategories.rejected,
      (state, { payload }) => (state.errorCategories = payload as any)
    );
    // add course
    builder.addCase(
      addCourse.fulfilled,
      (state, { payload }) => (state.course = payload)
    );
    builder.addCase(
      addCourse.rejected,
      (state, { payload }) => (state.errorAddCourse = payload as any)
    );
    //------------------------------------------------------------
    builder.addCase(getCourseList.pending, (state) => {
      state.isCourseListLoading = true;
    });
    builder.addCase(getCourseList.fulfilled, (state, { payload }) => {
      state.errorCourseList = null;
      state.isCourseListLoading = false;
      state.courseList = payload;
    });
    builder.addCase(getCourseList.rejected, (state, { error }) => {
      state.isCourseListLoading = false;
      state.errorCourseList = error.message as string;
    });
    //------------------------------------------------------------------
    builder.addCase(getCourseInfo.pending, (state) => {
      state.isCourseInfoLoading = true;
    });
    builder.addCase(getCourseInfo.fulfilled, (state, { payload }) => {
      state.errorCourseInfo = null;
      state.isCourseInfoLoading = false;
      state.courseInfo = payload;
    });
    builder.addCase(getCourseInfo.rejected, (state, { error }) => {
      state.isCourseInfoLoading = false;
      state.errorCourseInfo = error.message as string;
    });
  },
});

export const { handleSearch, getSrcPreview } = courseSlice.actions;
export default courseSlice.reducer;
