import { Box, Button, Grid, Stack, TextField, IconButton } from "@mui/material";
import { AppDispatch, RootState } from "configStore";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSrcPreview, updateCourse } from "Slices/courseSLice";
import schemaUpdateCourse from "./schemaUpdateCourse";
import { yupResolver } from "@hookform/resolvers/yup";
import { SpanError } from "Pages/AddUser/AddUser";
import SweetAlert2 from "react-sweetalert2";
import { CourseUpdate } from "Interfaces/Course";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

type Props = {};

const DetailContent = (props: Props) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [srcPreview, setSrcPreview] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { courseInfo } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    return () => {
      srcPreview && URL.revokeObjectURL(srcPreview);
    };
  }, [srcPreview]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maKhoaHoc: `${courseInfo?.maKhoaHoc}`,
      tenKhoaHoc: `${courseInfo?.tenKhoaHoc}`,
      biDanh: `${courseInfo?.biDanh}`,
      hinhAnh: `${courseInfo?.hinhAnh}`,
      moTa: `${courseInfo?.moTa}`,
      luotXem: courseInfo?.luotXem as number,
      danhGia: 0,
      maNhom: `${courseInfo?.maNhom}`,
      ngayTao: `${courseInfo?.ngayTao}`,
      taiKhoanNguoiTao: `${courseInfo?.nguoiTao.taiKhoan}`,
      maDanhMucKhoaHoc: `${courseInfo?.danhMucKhoaHoc.maDanhMucKhoahoc}`,
    },
    mode: "onTouched",
    resolver: yupResolver(schemaUpdateCourse),
  });

  const onSubmit = (values: CourseUpdate) => {
    console.log(values);
    setOpenConfirm(false);
    dispatch(updateCourse(values));
    setOpenSuccess(true);
    setIsReadOnly(true);
  };

  const onError = (error: FieldErrors<CourseUpdate>) => {
    setOpenError(true);
  };

  const handlePreviewImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      dispatch(getSrcPreview(URL.createObjectURL(file)));
      setSrcPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box>
      <SweetAlert2
        show={openConfirm}
        icon="question"
        title="Bạn có muốn chỉnh sửa?"
        confirmButtonText="Đồng ý"
        cancelButtonText="Hủy bỏ"
        showCancelButton={true}
        onConfirm={handleSubmit(onSubmit, onError)}
        didClose={() => {
          setOpenConfirm(false);
        }}
      />

      <SweetAlert2
        show={openSuccess}
        icon="success"
        title="Chỉnh sửa thành công!!!"
        confirmButtonText="Đồng ý"
        timer={2000}
        onConfirm={() => {
          setOpenSuccess(false);
        }}
        didClose={() => {
          setOpenSuccess(false);
        }}
      />

      <SweetAlert2
        show={openError}
        icon="error"
        title="Có lỗi xảy ra!!!"
        // text={onError}
        onConfirm={() => setOpenError(false)}
        didClose={() => {
          setOpenError(false);
        }}
      />

      <Box
        component="form"
        sx={{ "&>*": { m: 1 } }}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Grid container sx={{ "&>*": { p: 1 } }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="maKhoaHoc"
              label="Mã khóa học"
              variant="outlined"
              {...register("maKhoaHoc")}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="tenKhoaHoc"
              label="Tên khóa học"
              variant="outlined"
              required
              {...register("tenKhoaHoc")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
            {errors.tenKhoaHoc && (
              <SpanError>{errors.tenKhoaHoc.message}</SpanError>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="biDanh"
              label="Bí danh"
              variant="outlined"
              required
              {...register("biDanh")}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="ngayTao"
              label="Ngày tạo"
              variant="outlined"
              required
              {...register("ngayTao")}
              InputProps={{
                readOnly: isReadOnly,
              }}
              // type="date"
            />
            {errors.ngayTao && <SpanError>{errors.ngayTao.message}</SpanError>}
          </Grid>
          <Grid item xs={12} sx={{ position: "relative" }}>
            <TextField
              fullWidth
              id="hinhAnh"
              label="Hình ảnh"
              variant="outlined"
              required
              defaultValue={courseInfo?.hinhAnh}
              sx={{ "&>*": { pr: 4 } }}
              InputProps={{
                readOnly: true,
              }}
            />
            <IconButton
              color="primary"
              component="label"
              disabled={isReadOnly}
              sx={{ position: "absolute", right: "2%", top: "25%" }}
            >
              <input
                hidden
                type="file"
                disabled={isReadOnly}
                {...register("hinhAnh", {
                  onChange: (event) => {
                    handlePreviewImage(event);
                  },
                })}
              />
              <PhotoCamera />
            </IconButton>
            {errors.hinhAnh && <SpanError>{errors.hinhAnh.message}</SpanError>}
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              id="danhGia"
              label="Đánh giá"
              variant="outlined"
              required
              {...register("danhGia")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
            {errors.danhGia && <SpanError>{errors.danhGia.message}</SpanError>}
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              id="luotXem"
              label="Lượt xem"
              variant="outlined"
              required
              {...register("luotXem")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
            {errors.luotXem && <SpanError>{errors.luotXem.message}</SpanError>}
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              id="taiKhoanNguoiTao"
              label="Tài khoản người tạo"
              variant="outlined"
              required
              {...register("taiKhoanNguoiTao")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
            {errors.taiKhoanNguoiTao && (
              <SpanError>{errors.taiKhoanNguoiTao.message}</SpanError>
            )}
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              id="maDanhMucKhoaHoc"
              label="Mã danh mục khóa học"
              variant="outlined"
              required
              {...register("maDanhMucKhoaHoc")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
            {errors.maDanhMucKhoaHoc && (
              <SpanError>{errors.maDanhMucKhoaHoc.message}</SpanError>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="moTa"
              label="Mô tả"
              variant="outlined"
              multiline
              rows={4}
              {...register("moTa")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end">
          {isReadOnly ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsReadOnly(false)}
            >
              Chỉnh sửa
            </Button>
          ) : (
            <Stack direction="row">
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpenConfirm(true)}
              >
                Lưu
              </Button>
              <Button
                variant="contained"
                color="warning"
                sx={{ ml: 2 }}
                onClick={() => setIsReadOnly(true)}
              >
                Hủy
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default DetailContent;
