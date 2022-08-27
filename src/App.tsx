import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";
import LoadingLazy from "Components/LoadingLazy/LoadingLazy";
import ProtectedRoute from "Pages/Routes/ProtectedRoute";
import AdminTemplate from "Templates/AdminTemplate";
import CourseManagement from "Pages/CourseManagement/CourseManagement";
import UserManagement from "Pages/UserManagement/UserManagement";
import AddCourse from "Pages/AddCourse/AddCourse";
import AddUser from "Pages/AddUser/AddUser";

const Login = lazy(() => import("Pages/Login/Login"));
const LoginTemplate = lazy(() => import("Templates/LoginTemplate"));

function App() {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingLazy/>}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path=""
                            element={
                                <ProtectedRoute>
                                    <AdminTemplate/>
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<CourseManagement/>}/>
                            <Route path="user-management" element={<UserManagement/>}/>
                            <Route path="add-course" element={<AddCourse/>}/>
                            <Route path="add-user" element={<AddUser/>}/>
                        </Route>
                        <Route path="login" element={<LoginTemplate/>}>
                            <Route index element={<Login/>}/>
                        </Route>
                        <Route path="*" element={<Navigate to={"/"}/>}></Route>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </ErrorBoundary>
    );
}

export default App;
