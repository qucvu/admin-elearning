import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FieldErrors, useForm, Controller } from "react-hook-form";
import { CourseAdd } from "Interfaces/Course";
import schemaAddCourse from "./schemaAddCourse";
import { SpanError } from "../AddUser/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import dayjs from "dayjs";
import { addCourse, getCategories } from "../../Slices/courseSLice";
import SweetAlert2 from "react-sweetalert2";

export const Title = styled.h1`
  text-align: center;
`;

const AddCourse = () => {
  const [group, setGroup] = useState("");
  const handleChangeGroup = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setmodalError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { categories, errorAddCourse } = useSelector(
    (state: RootState) => state.course
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseAdd>({
    mode: "onTouched",
    resolver: yupResolver(schemaAddCourse),
  });
  const dispatch = useDispatch<AppDispatch>();
  const findCategoryName = (id: string) => {
    const category = categories.find((item) => item.maDanhMuc === id);
    return category?.tenDanhMuc;
  };
  const onValid = async (values: CourseAdd) => {
    setIsLoading(true);
    delete values["nguoiTao"];
    const courseAdd = {
      ...values,
      hinhAnh: values.hinhAnh[0],
      maNhom: "GP01",
      danhMucKhoaHoc: {
        maDanhMucKhoahoc: values.danhMucKhoaHoc,
        tenDanhMucKhoaHoc: findCategoryName(values.danhMucKhoaHoc),
      },
      maKhoaHoc: "data",
    };
    console.log(courseAdd);
    try {
      await dispatch(addCourse(courseAdd)).unwrap();
      setModalSuccess(true);
    } catch (e) {
      setmodalError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (error: FieldErrors<CourseAdd>) => {
    setModalSuccess(false);
  };

  useEffect(() => {
    dispatch(getCategories(""));
  }, []);

  return (
    <Container>
      <SweetAlert2
        {...{
          show: modalSuccess,
          icon: "success",
          title: "Th??m kh??a h???c th??nh c??ng",
          position: "center",
          showConfirmButton: true,
          timer: 3000,
        }}
        didClose={() => {
          setModalSuccess(false);
          reset();
        }}
      />

      <SweetAlert2
        {...{
          show: modalError,
          icon: "error",
          title: errorAddCourse,
          position: "center",
          showConfirmButton: true,
          timer: 3000,
        }}
        didClose={() => setmodalError(false)}
      />
      <Title>Th??m kh??a h???c</Title>
      <form onSubmit={handleSubmit(onValid, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="T??n kh??a h???c"
              id="courseName"
              autoComplete="courseName"
              {...register("tenKhoaHoc")}
            />
            {errors.tenKhoaHoc && (
              <SpanError>{errors.tenKhoaHoc.message}</SpanError>
            )}

            <TextField
              label="Ng??y t???o"
              margin="normal"
              variant="outlined"
              autoComplete="dayCreate"
              fullWidth
              id="dayCreate"
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              {...register("ngayTao")}
              value={dayjs(new Date()).format("YYYY-MM-DD")}
            />
            {errors.ngayTao && <SpanError>{errors.ngayTao.message}</SpanError>}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="creator"
              label="Ng?????i t???o"
              autoComplete="creator"
              {...register("nguoiTao")}
              InputLabelProps={{ shrink: true, required: true }}
              value={`${user?.hoTen} - ${user?.soDT}`}
              inputProps={{
                readOnly: true,
                style: {
                  fontWeight: "bold",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="groupId">Danh m???c kh??a h???c</InputLabel>
              <Select
                labelId="groupId"
                id="groupId"
                value={group}
                label="Danh m???c kh??a h???c"
                {...register("danhMucKhoaHoc", { onChange: handleChangeGroup })}
              >
                {categories.map((item, index) => (
                  <MenuItem key={index} value={item.maDanhMuc}>
                    {item.tenDanhMuc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.maNhom && <SpanError>{errors.maNhom.message}</SpanError>}
            <TextField
              type="file"
              fullWidth
              id="image"
              required
              margin="normal"
              label="H??nh ???nh"
              InputLabelProps={{ shrink: true }}
              {...register("hinhAnh")}
            />
            {errors.hinhAnh && <SpanError>{errors.hinhAnh.message}</SpanError>}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="desc"
              label="M?? t???"
              autoComplete="desc"
              multiline
              minRows={3}
              {...register("moTa")}
            />
            {errors.moTa && <SpanError>{errors.moTa.message}</SpanError>}
          </Grid>
        </Grid>

        <Box width={"100%"} textAlign="center" mt={3}>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "10rem", height: "3rem", overflow: "hidden" }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress color="inherit" /> : "Th??m Kh??a h???c"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddCourse;
