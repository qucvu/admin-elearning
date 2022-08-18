import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Grid,
  Link,
  Box,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoginValues } from "Interfaces/Login";
import { FieldErrors, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch, RootState } from "configStore";
import { useNavigate } from "react-router-dom";
import {
  Form,
  WrappedForm,
} from "_PlayGround/StyledComponents/FormLogin.styles";
import Copyright from "Components/Copyright/Copyright";

const schemaLogin = object({
  taiKhoan: string().required("Đây là trường bắt buộc!"),
  matKhau: string().required("Đây là trường bắt buộc!"),
});

export const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container component="main" maxWidth="sm">
      <WrappedForm>
        <Avatar sx={{ margin: "0.5rem", backgroundColor: "#e71a0f" }}></Avatar>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Đăng nhập
        </Typography>
        <Form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="account"
            label="Tài khoản"
            autoComplete="account"
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            // color={errors.matKhau && "warning"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="error" />}
            label="Nhớ tài khoản"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              margin: "1rem 0",
              backgroundColor: "#e71a0f",
              "&:hover": {
                backgroundColor: " #c0150c",
              },
            }}
            type="submit"
          >
            {/* {isLoading ? <CircularProgress color="inherit" /> : "ĐĂNG NHẬP"} */}
            ĐĂNG NHẬP
          </Button>
          <Link href="#" variant="body2" color="inherit">
            Quên mật khẩu?
          </Link>
        </Form>
        <Box mt={6}>
          <Copyright />
        </Box>
      </WrappedForm>
    </Container>
  );
};

export default Login;
