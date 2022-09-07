import {mixed, object, string} from "yup";

const schemaAddMovie = object({
    tenKhoaHoc: string().required("Đây là trường bắt buộc!"),
    moTa: string().required("Đây là trường bắt buộc!"),
    ngayTao: string().required("Đây là trường bắt buộc!"),
    danhMucKhoaHoc: string().required("Đây là trường bắt buộc!"),
    hinhAnh: mixed().required("Đây là trường bắt buộc!"),
});

export default schemaAddMovie;
