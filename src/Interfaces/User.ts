export interface User {
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDT: string;
    maNhom: string;
    maLoaiNguoiDung: string;
    accessToken: string;
}

export interface UserRegister {
    taiKhoan: string;
    matKhau?: string;
    email: string;
    hoTen: string;
    soDt: string;
    passwordConfirm?: string;
    maNhom?: string;
    maLoaiNguoiDung?: string;
}

