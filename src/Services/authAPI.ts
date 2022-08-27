import { LoginValues } from "Interfaces/Login";
import { User } from "Interfaces/User";
import axiosClient from "./axiosClient";

const authAPI = {
  getUser: (values: LoginValues) =>
    axiosClient.post<User>("QuanLyNguoiDung/DangNhap", values),
};

export default authAPI;
