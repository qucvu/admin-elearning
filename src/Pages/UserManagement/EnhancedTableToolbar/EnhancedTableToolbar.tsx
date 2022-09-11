import {
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  Paper,
  InputBase,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { alpha } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "configStore";

import { deleteUser, handleSearch } from "Slices/userSlice";
import Swal from "sweetalert2";
import SweetAlert2 from "react-sweetalert2";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = { numSelected: number; selected: string[] };

const EnhancedTableToolbar = ({ numSelected, selected }: Props) => {
  const [openSuccess, setOpenSuccess] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchText: "",
    },
    mode: "onSubmit",
  });
  useEffect(() => {
    dispatch(handleSearch(""));

    return () => {};
  }, [dispatch]);
  const onSubmit = (values: any) => {
    dispatch(handleSearch(values.searchText));
  };
  const onError = () => {};
  const handleDelete = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        selected.map((taiKhoan) =>
          dispatch(deleteUser(taiKhoan)).then((res: any) => {
            if (res.error?.message) {
              Swal.fire(res.error?.message, "", "info");
            } else setOpenSuccess(true);
          })
        );
      } else if (result.isDenied) {
        setOpenSuccess(false);
      }
    });
  };
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const handleSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(handleSearch(event.target.value));
    }, 300);
  };

  return (
    <Fragment>
      <SweetAlert2
        show={openSuccess}
        title="Xóa thành công!"
        icon="success"
        timer={2000}
        position="center"
        didClose={() => navigate(-1)}
      />
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Đã chọn {numSelected}
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          ></Typography>
        )}

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm kiếm người dùng"
            {...register("searchText", {
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                handleSearchText(event);
              },
            })}
          />
          <IconButton sx={{ p: "10px" }} type="submit">
            <SearchIcon />
          </IconButton>
        </Paper>

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                handleDelete();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </Fragment>
  );
};

export default EnhancedTableToolbar;
