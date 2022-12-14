import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { AppDispatch, RootState } from "configStore";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSrcPreview, updateCourse } from "Slices/courseSLice";
import schemaUpdateCourse from "./schemaUpdateCourse";
import { yupResolver } from "@hookform/resolvers/yup";
import { SpanError } from "Pages/AddUser/AddUser";
import SweetAlert2 from "react-sweetalert2";
import { CourseUpdate } from "Interfaces/Course";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import dayjs from "dayjs";

const DetailContent = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [srcPreview, setSrcPreview] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [category, setCategory] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setCategory(event.target.value);
  }, []);

  const { courseInfo, categories } = useSelector(
    (state: RootState) => state.course
  );

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
      biDanh: `${courseInfo?.biDanh}`,
      tenKhoaHoc: `${courseInfo?.tenKhoaHoc}`,
      moTa: `${courseInfo?.moTa}`,
      luotXem: courseInfo?.luotXem as number,
      danhGia: 0,
      hinhAnh: `${courseInfo?.hinhAnh}`,
      maNhom: `${courseInfo?.maNhom}`,
      ngayTao: `${courseInfo?.ngayTao}`,
      maDanhMucKhoaHoc: `${courseInfo?.danhMucKhoaHoc.maDanhMucKhoahoc}`,
      taiKhoanNguoiTao: `${courseInfo?.nguoiTao.taiKhoan}`,
    },
    mode: "onTouched",
    resolver: yupResolver(schemaUpdateCourse),
  });

  const onSubmit = (values: CourseUpdate) => {
    setOpenConfirm(false);
    let payload;
    srcPreview
      ? (payload = {
          ...values,
          hinhAnh: values.hinhAnh[0],
          ngayTao: dayjs(values.ngayTao).format("DD/MM/YYYY"),
        })
      : (payload = {
          ...values,
        });
    console.log(payload);
    dispatch(updateCourse(payload))
      .then((res: any) => {
        if (res.error?.message) {
          console.log(res);
          setOpenError(true);
        } else {
          setOpenSuccess(true);
          setIsReadOnly(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpenError(true);
      });
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
        title="B???n c?? mu???n ch???nh s???a?"
        confirmButtonText="?????ng ??"
        cancelButtonText="H???y b???"
        showCancelButton={true}
        onConfirm={handleSubmit(onSubmit, onError)}
        didClose={() => {
          setOpenConfirm(false);
        }}
      />

      <SweetAlert2
        show={openSuccess}
        icon="success"
        title="Ch???nh s???a th??nh c??ng!!!"
        confirmButtonText="?????ng ??"
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
        title="C?? l???i x???y ra!!!"
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
              label="M?? kh??a h???c"
              variant="outlined"
              {...register("maKhoaHoc")}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="tenKhoaHoc"
              label="T??n kh??a h???c"
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
              label="B?? danh"
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
              label="Ng??y t???o"
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
              label="H??nh ???nh"
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
              label="????nh gi??"
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
              label="L?????t xem"
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
              label="T??i kho???n ng?????i t???o"
              variant="outlined"
              required
              {...register("taiKhoanNguoiTao")}
              InputProps={{
                readOnly: true,
              }}
            />
            {errors.taiKhoanNguoiTao && (
              <SpanError>{errors.taiKhoanNguoiTao.message}</SpanError>
            )}
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="category-select">Danh m???c</InputLabel>
              <Select
                labelId="category-select"
                id="category-select"
                value={
                  category === "" &&
                  courseInfo?.danhMucKhoaHoc.maDanhMucKhoahoc &&
                  categories.find(
                    (category) =>
                      category.maDanhMuc ===
                      courseInfo?.danhMucKhoaHoc.maDanhMucKhoahoc
                  )
                    ? courseInfo?.danhMucKhoaHoc.maDanhMucKhoahoc
                    : category
                }
                label="Category"
                {...register("maDanhMucKhoaHoc", {
                  onChange: (event: SelectChangeEvent) => {
                    handleChange(event);
                  },
                })}
              >
                {categories.map((category) => {
                  return (
                    <MenuItem
                      key={category.maDanhMuc}
                      value={category.maDanhMuc}
                    >
                      {category.maDanhMuc}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* <TextField
              fullWidth
              id="maDanhMucKhoaHoc"
              label="M?? danh m???c kh??a h???c"
              variant="outlined"
              required
              {...register("maDanhMucKhoaHoc")}
              InputProps={{
                readOnly: isReadOnly,
              }}
            />
            {errors.maDanhMucKhoaHoc && (
              <SpanError>{errors.maDanhMucKhoaHoc.message}</SpanError>
            )} */}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="moTa"
              label="M?? t???"
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
              Ch???nh s???a
            </Button>
          ) : (
            <Stack direction="row">
              <Button
                variant="contained"
                color="success"
                onClick={() => setOpenConfirm(true)}
              >
                L??u
              </Button>
              <Button
                variant="contained"
                color="warning"
                sx={{ ml: 2 }}
                onClick={() => setIsReadOnly(true)}
              >
                H???y
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default DetailContent;
