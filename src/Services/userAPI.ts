import { User, UserRegister } from "Interfaces/User";
import axiosClient from "./axiosClient";

const userAPI = {
  addUser: (userRegister: UserRegister) =>
    axiosClient.post<UserRegister>(
      "QuanLyNguoiDung/ThemNguoiDung",
      userRegister
    ),
  getUserList: (keyword?: string) =>
    axiosClient.get<User[]>("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        tuKhoa: keyword,
      },
    }),
  getUserInfo: () => axiosClient.get<any>("QuanLyNguoiDung/ThongTinNguoiDung"),
  deleteUser: (userName: string) =>
    axiosClient.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        taiKhoan: userName,
      },
    }),
  updateUser: (values: UserRegister) =>
    axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", values),
};

export default userAPI;
