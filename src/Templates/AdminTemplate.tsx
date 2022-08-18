import { forwardRef, Fragment, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import { v4 } from "uuid";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MovieIcon from "@mui/icons-material/Movie";
import TheatersIcon from "@mui/icons-material/Theaters";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch } from "react-redux";
import { AppDispatch } from "configStore";

const drawerWidth = 260;
const DrawerTitles = [
  {
    id: v4(),
    text: "Quản lý phim",
    icon: <TheatersIcon />,
    path: "/",
  },
  {
    id: v4(),
    text: "Quản lý người dùng",
    icon: <GroupIcon />,
    path: "/user-management",
  },
  {
    id: v4(),
    text: "Thêm lịch chiếu",
    icon: <MoreTimeIcon />,
    path: "/add-showtimes",
  },
  {
    id: v4(),
    text: "Thêm người dùng",
    icon: <PersonAddIcon />,
    path: "/add-user",
  },
  {
    id: v4(),
    text: "Thêm phim",
    icon: <MovieIcon />,
    path: "/add-movie",
  },
];

const AdminTemplate = () => {
  return (
    <div>
      AdminTemplate <Outlet />
    </div>
  );
};

export default AdminTemplate;
