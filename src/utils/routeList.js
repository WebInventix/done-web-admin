import MainDashboard from "../component/UserDashboard/MainDashboard";
import { UserDashboard } from "../component/UserDashboard/UserDashboard";
import Home from "../pages/Home";
import CheckYourEmail from "../pages/auth/CheckYourEmail";
import CreatePassword from "../pages/auth/CreatePassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import UserSignUp from "../pages/auth/UserSignup";
import SelectLocationScreen from "../screens/Dashboard/SelectLocationScreen";

export const mainRoutes = [
  // {
  //   caption: "Home",
  //   linkTo: "/",
  //   icon: "",
  //   element: <Home />,
  //   authRequired: false,
  // },
  {
    caption: 'MainDashboard',
    linkTo: '/dashboard-home',
    element: <MainDashboard />,
    authRequired: true

  },
  {
    caption: 'UserDashboard',
    linkTo: '/*',
    element: <UserDashboard />,
    authRequired: true

  },
  {
    caption: "Login",
    linkTo: "/admin/login",
    icon: "",
    element: <Login />,
    authRequired: false,
  },
  {
    caption: "Signup",
    linkTo: "/signup",
    icon: "",
    element: <SignUp />,
    authRequired: false,
  },
  {
    caption: "Signup",
    linkTo: "/signup-user",
    icon: "",
    element: <UserSignUp />,
    authRequired: false,
  },
  {
    caption: "Forgot Password",
    linkTo: "/forgot-password",
    icon: "",
    element: <ForgotPassword />,
    authRequired: false,
  },
  {
    caption: "Check Email",
    linkTo: "/check-email",
    icon: "",
    element: <CheckYourEmail />,
    authRequired: false,
  },
  {
    caption: "Create password",
    linkTo: "/create-password",
    icon: "",
    element: <CreatePassword />,
    authRequired: false,
  },
  {
    caption: "ServiceDetails",
    linkTo: "/ServiceDetails",
    icon: "",
    element: <SelectLocationScreen />,
    authRequired: false,
  },
];
