import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJob from "../Pages/Jobs/CreateJob";
import JobPricing from "../Pages/Jobs/JobPricing";
import ApplicantJobs from "../Pages/Jobs/ApplicantJobs";
import RecruiterJobs from "../Pages/Jobs/RecruiterJobs";
import JobDetail from "../Pages/Jobs/JobDetail";
import Login from "../Pages/Auth/Login"
import Regiter from "../Pages/Auth/Register";
import AccountManagement from "../Pages/Account/AccountManagement";
import LandingPage from "../Pages/LandingPage";
import RegisterRole from "../Pages/Auth/RegisterRole";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signup/role", element: <ProtectedRoute Component={RegisterRole} /> },
      { path: "/search", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/applicants/jobs", element: <ProtectedRoute Component={ApplicantJobs} /> },
      { path: "/recruiters/jobs", element: <ProtectedRoute Component={RecruiterJobs} /> },
      { path: "/recruiters/jobs/:id", element: <ProtectedRoute Component={JobPricing} /> },
      { path: "/recruiters/post-job", element: <ProtectedRoute Component={CreateJob} /> },
      { path: "/account", element: <ProtectedRoute Component={AccountManagement} /> },
      { path: "/jobs/:id", element: <ProtectedRoute Component={JobDetail} /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Regiter /> },
    ],
  },
]);
export default router;
