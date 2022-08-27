import {css} from "@emotion/react";

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
    Link,
    Box,
} from "@mui/material";

import {useEffect, useRef, useState} from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {LoginValues} from "Interfaces/Login";
import {FieldErrors, useForm} from "react-hook-form";
import {object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {AppDispatch, RootState} from "configStore";
import {useNavigate} from "react-router-dom";
import {
    Form,
    WrappedForm,
} from "_PlayGround/StyledComponents/FormLogin.styles";
import Copyright from "Components/Copyright/Copyright";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "Slices/auth";
import SweetAlert2 from "react-sweetalert2";

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
    const [loginSucess, setLoginSuccess] = useState(false);
    const {errorLogin, isLoading, user} = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginValues>({
        mode: "onTouched",
        resolver: yupResolver(schemaLogin),
    });
    const navigate = useNavigate();
    const onSuccess = async (values: LoginValues) => {
        try {
            await dispatch(getUser(values)).unwrap();
            setLoginSuccess(true);
        } catch (error) {
            setLoginSuccess(false);
        }
    };

    const onError = (error: FieldErrors<LoginValues>) => {
        console.log(error);
    };

    useEffect(() => {
        const isLoginSuccess = JSON.parse(
            localStorage.getItem("isLoginSucess") as string
        );
        if (isLoginSuccess && user) navigate(-1);
    }, []);
    return (
        <Container component="main" maxWidth="sm">
            <SweetAlert2
                {...{
                    show: loginSucess,
                    position: "center",
                    icon: "success",
                    title: "Đăng nhập thành công!",
                    showConfirmButton: true,
                    timer: 2500,
                }}
                didClose={() => {
                    navigate("/");
                    localStorage.setItem("isLoginSucess", "true");
                }}
            />
            <WrappedForm>
                <Avatar sx={{margin: "0.5rem", backgroundColor: "#e71a0f"}}></Avatar>
                <Typography component="h1" variant="h5" fontWeight="bold">
                    Đăng nhập
                </Typography>
                <Form onSubmit={handleSubmit(onSuccess, onError)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="account"
                        label="Tài khoản"
                        autoComplete="account"
                        autoFocus
                        color={errors.taiKhoan && "warning"}
                        {...register("taiKhoan")}
                    />
                    {errors.taiKhoan && (
                        <Typography
                            sx={{
                                color: "#e71a0f",
                                margin: "-0.2rem 0.3rem 0",
                                fontSize: "0.75rem",
                            }}
                        >
                            {errors.taiKhoan.message}
                        </Typography>
                    )}

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Mật khẩu"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        color={errors.matKhau && "warning"}
                        {...register("matKhau")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {errors.matKhau && (
                        <Typography
                            sx={{
                                color: "#e71a0f",
                                margin: "-0.2rem 0.3rem 0",
                                fontSize: "0.75rem",
                            }}
                        >
                            {errors.matKhau.message}
                        </Typography>
                    )}

                    <FormControlLabel
                        control={<Checkbox value="remember" color="error"/>}
                        label="Nhớ tài khoản"
                    />
                    {errorLogin && (
                        <Alert severity="error" sx={{fontWeight: "600"}}>
                            {errorLogin}
                        </Alert>
                    )}
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
                        disabled={isLoading}
                    >
                        ĐĂNG NHẬP
                    </Button>
                    <Link href="#" variant="body2" color="inherit">
                        Quên mật khẩu?
                    </Link>
                </Form>
                <Box mt={6}>
                    <Copyright/>
                </Box>
            </WrappedForm>
        </Container>
    );
};

export default Login;
