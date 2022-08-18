import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";
import LoadingLazy from "Components/LoadingLazy/LoadingLazy";
import LoginTemplate from "Templates/LoginTemplate";
import ProtectedRoute from "Pages/Routes/ProtectedRoute";
import AdminTemplate from "Templates/AdminTemplate";

const CourseManagement = lazy(
  () => import("Pages/CourseManagement/CourseManagement")
);

const UserManagement = lazy(
  () => import("Pages/UserManagement/UserManagement")
);
const AddCourse = lazy(() => import("Pages/AddCourse/AddCourse"));
const AddUser = lazy(() => import("Pages/AddUser/AddUser"));
const Login = lazy(() => import("Pages/Login/Login"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingLazy />}>
        <BrowserRouter>
          <Routes>
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <AdminTemplate />
                </ProtectedRoute>
              }
            >
              <Route index element={<CourseManagement />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="add-user" element={<AddUser />} />
            </Route>
            <Route path="login" element={<LoginTemplate />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="*" element={<Navigate to={"/"} />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
