import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Stack,
  Button,
} from "@mui/material";
import { MouseEvent } from "react";
// import { User } from "Interfaces/User";
import { Course } from "Interfaces/Course";
import { useNavigate } from "react-router-dom";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof Course>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

type Props = {
  dense: boolean;
  courseList: Course[] | null;
  rowsPerPage: number;
  page: number;
  selected: string[];
  order: Order;
  orderBy: keyof Course;
  handleClick: (event: MouseEvent<unknown>, name: string | number) => void;
};

const EnhancedTableBody = (props: Props) => {
  const {
    dense,
    courseList,
    rowsPerPage,
    page,
    selected,
    order,
    orderBy,
    handleClick,
  } = props;

  const navigate = useNavigate();

  const isSelected = (name: string | number) =>
    selected.indexOf(name as string) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseList!.length) : 0;

  return (
    <TableBody>
      {courseList
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort(getComparator(order, orderBy))
        .map((row: Course, index: number) => {
          const isItemSelected = isSelected(row.maKhoaHoc);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row.maKhoaHoc)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.maKhoaHoc}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.maKhoaHoc}
              </TableCell>
              <TableCell align="right">{row.tenKhoaHoc}</TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", sm: "table-cell" } }}
              >
                {row.danhMucKhoaHoc.tenDanhMucKhoaHoc}
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                {row.nguoiTao.taiKhoan}
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                {row.maNhom}
              </TableCell>

              <TableCell align="center">
                <Stack>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/course-detail/${row.maKhoaHoc}`)}
                    sx={{ fontSize: { xs: "0.7rem", md: "0.8rem" } }}
                  >
                    Chi tiết
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default EnhancedTableBody;
