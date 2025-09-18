import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import SignUp from "../Components/SignUp";
import LogIn from "../Components/LogIn";
import About from "../Pages/About";

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
    ],
  },
]);

export default router;
