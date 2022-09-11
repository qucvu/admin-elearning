import {
  Box,
  Container,
  Table,
  TableContainer,
  TablePagination,
  Paper,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { AppDispatch, RootState } from "configStore";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import EnhancedTableToolbar from "./EnhancedTableToolbar/EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead";
import EnhancedTableBody from "./EnhancedTableBody/EnhancedTableBody";
import { Title } from "Pages/AddCourse/AddCourse";
import { getCourseList } from "Slices/courseSLice";
import { Course } from "Interfaces/Course";

type Order = "asc" | "desc";

const CourseManagement = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Course>("maKhoaHoc");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch<AppDispatch>();

  const { courseList, searchText } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(getCourseList(searchText));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Course
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = courseList?.map((n: Course) => {
        return n.maKhoaHoc;
      });
      setSelected(newSelecteds as string[]);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, name: string | number) => {
    const selectedIndex = selected.indexOf(name as string);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name as string);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected as string[]);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };
  return (
    <Container>
      <Title>Quản lý khóa học</Title>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            selected={selected}
          />
          <TableContainer>
            <Table
              // sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={courseList?.length}
              />
              <EnhancedTableBody
                dense={dense}
                courseList={courseList}
                rowsPerPage={rowsPerPage}
                page={page}
                selected={selected}
                order={order}
                orderBy={orderBy}
                handleClick={handleClick}
              />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={courseList?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage=""
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Rút gọn"
        />
      </Box>
    </Container>
  );
};

export default CourseManagement;
