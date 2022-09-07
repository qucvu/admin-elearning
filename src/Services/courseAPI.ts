import {Category} from "Interfaces/Course"
import axiosClient from "./axiosClient";


const courseAPI = {
    addCourse: (values: [key: string]) => {
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        return axiosClient.post("QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData);
    },
    getCategories: (categoryName?: string) => axiosClient.get<Category[]>("QuanLyKhoaHoc/LayDanhMucKhoaHoc", {
        params: {
            tenDanhMuc: categoryName
        }
    })
}

export default courseAPI