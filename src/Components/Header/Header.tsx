import {
  Avatar,
  Box,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { logoutUser } from "Slices/auth";
import SweetAlert2 from "react-sweetalert2";

const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
`;
const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleConfirmLogout = () => {
    dispatch(logoutUser());
  };

  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <WrapperHeader>
      <SweetAlert2
        {...{
          show: showModal,
          title: "Bạn có chắc muốn đăng xuất?",
          icon: "question",
          showCancelButton: true,

          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy bỏ",
        }}
        onConfirm={handleConfirmLogout}
        didClose={() => setShowModal(false)}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: " 0.5rem",
        }}
      >
        <IconButton sx={{ p: 0 }}>
          <Avatar src="https://i.pravatar.cc" alt="https://i.pravatar.cc" />
        </IconButton>
        <Typography
          fontSize="0.9rem"
          color="#ccc"
          letterSpacing="0.2px"
          fontWeight="500"
        >
          {user?.email}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "block",
          color: "#d1d5db",
          fontWeight: "bold",
          margin: "0.5rem 0",
        }}
      >
        <ListItemButton
          sx={{
            px: 2.5,
          }}
          onClick={() => setShowModal(true)}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              color: "#d1d5db",
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </Box>
    </WrapperHeader>
  );
};

export default Header;
