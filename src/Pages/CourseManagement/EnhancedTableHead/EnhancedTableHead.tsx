import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  Checkbox,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { visuallyHidden } from "@mui/utils";
import { MouseEvent, ChangeEvent, useEffect, useState } from "react";
import { Course } from "Interfaces/Course";
// import { User } from "Interfaces/User";

type Order = "asc" | "desc";
interface HeadCell {
  disablePadding: boolean;
  id: keyof Course;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "maKhoaHoc",
    numeric: false,
    disablePadding: true,
    label: "Mã khóa học",
  },
  {
    id: "tenKhoaHoc",
    numeric: true,
    disablePadding: false,
    label: "Tên khóa học",
  },
];

const smHeadCells: readonly HeadCell[] = [
  {
    id: "maKhoaHoc",
    numeric: false,
    disablePadding: true,
    label: "Mã khóa học",
  },
  {
    id: "tenKhoaHoc",
    numeric: true,
    disablePadding: false,
    label: "Tên khóa học",
  },
  {
    id: "danhMucKhoaHoc",
    numeric: true,
    disablePadding: false,
    label: "Danh mục khóa học",
  },
  {
    id: "nguoiTao",
    numeric: true,
    disablePadding: false,
    label: "Người tạo",
  },
];

const mdHeadCells: readonly HeadCell[] = [
  {
    id: "maKhoaHoc",
    numeric: false,
    disablePadding: true,
    label: "Mã khóa học",
  },
  {
    id: "tenKhoaHoc",
    numeric: true,
    disablePadding: false,
    label: "Tên khóa học",
  },
  {
    id: "danhMucKhoaHoc",
    numeric: true,
    disablePadding: false,
    label: "Danh mục khóa học",
  },
  {
    id: "nguoiTao",
    numeric: true,
    disablePadding: false,
    label: "Người tạo",
  },
  {
    id: "maNhom",
    numeric: true,
    disablePadding: false,
    label: "Mã nhóm",
  },
];

type Props = {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Course) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number | undefined;
};

const EnhancedTableHead = (props: Props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Course) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const [screenWidth, setSreenWidth] = useState<number>(window.innerWidth);
  window.onresize = function (event) {
    setSreenWidth(window.innerWidth);
  };
  useEffect(() => {
    return () => {};
  }, [screenWidth]);

  return (
    <TableHead sx={{ bgcolor: "#d9f89e" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount!}
            checked={rowCount! > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {screenWidth < 900
          ? screenWidth < 600
            ? headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))
            : smHeadCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))
          : mdHeadCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
        <TableCell align="center" padding="normal">
          <SettingsIcon />
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
