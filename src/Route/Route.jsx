import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import SignUp from "../Components/SignUp";
import LogIn from "../Components/LogIn";
import About from "../Pages/About";
import Profile from "../Pages/Profile";
import PrivateRoute from "../Components/Context/PrivateRouter";
import CourseDetails from "../Pages/CourseDetails";
import AddCourses from "../Pages/AddCourses";
import ManageCourses from "../Pages/ManageCourses";
import EditCourse from "../Pages/EditCourse";
import MyEnrolledCourses from "../Pages/MyEnrolledCourses";
import Courses from "../Pages/Courses";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {path: "/courses",
        Component: Courses,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "*",
        Component: ErrorPage,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/courses/:id",
        Component: CourseDetails,
      },
      {
        path: "/add-course",
        element: (
          <PrivateRoute>
            <AddCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-courses",
        element: (
          <PrivateRoute>
            <ManageCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-course/:id",
        element: (
          <PrivateRoute>
            <EditCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-enrolled",
        element: (
          <PrivateRoute>
            <MyEnrolledCourses />
          </PrivateRoute>
        ),
      },

      // Catch all unknown routes
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);

export default router;
