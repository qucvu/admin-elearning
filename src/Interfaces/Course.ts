export interface CourseAdd {
  tenKhoaHoc: string;
  hinhAnh: FileList;
  ngayTao: string;
  moTa: string;
  danhMucKhoaHoc: string;
  nguoiTao?: string;
  biDanh?: string;
  maNhom?: string;
}

export interface Course {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: Creator;
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
}

export interface Category {
  tenDanhMuc: string;
  maDanhMuc: string;
}

export interface Creator {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}

export interface CourseUpdate {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  hinhAnh: string;
  moTa: string;
  luotXem: number;
  danhGia: number;
  maNhom: string;
  ngayTao: string;
  taiKhoanNguoiTao: string;
  maDanhMucKhoaHoc: string;
}
