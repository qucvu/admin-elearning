import { CourseUpdate } from "./../Interfaces/Course";
import { Category, Course } from "Interfaces/Course";
import axiosClient from "./axiosClient";

const courseAPI = {
  addCourse: (values: [key: string]) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    return axiosClient.post("QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData);
  },
  getCategories: (categoryName?: string) =>
    axiosClient.get<Category[]>("QuanLyKhoaHoc/LayDanhMucKhoaHoc", {
      params: {
        tenDanhMuc: categoryName,
      },
    }),
  getCourseList: (tenKhoaHoc?: string) => {
    return axiosClient.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc`, {
      params: {
        tenKhoaHoc: tenKhoaHoc,
      },
    });
  },
  deleteCourse: (maKhoaHoc: string) => {
    return axiosClient.delete(`QuanLyKhoaHoc/XoaKhoaHoc`, {
      params: {
        maKhoaHoc: maKhoaHoc,
      },
    });
  },
  getCourseInfo: (courseId: string) => {
    return axiosClient.get<Course>(
      `QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId}`
    );
  },
  updateCourse: (payload: [key: string]) => {
    const formData = new FormData();

    for (let key in payload) {
      formData.append(key, payload[key]);
    }

    return axiosClient.post<CourseUpdate>(
      `QuanLyKhoaHoc/CapNhatKhoaHocUpload`,
      formData
    );
  },
};

export default courseAPI;
