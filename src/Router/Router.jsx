import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJob from "../Pages/Jobs/CreateJob";
import RecruiterJobDetail from "../Pages/Jobs/recruiter/RecruiterJobDetail";
import ApplicantJobs from "../Pages/Jobs/applicant/ApplicantJobs";
import RecruiterJobs from "../Pages/Jobs/recruiter/RecruiterJobs";
import JobDetail from "../Pages/Jobs/JobDetail";
import Login from "../Pages/Auth/Login"
import Regiter from "../Pages/Auth/Register";
import AccountManagement from "../Pages/Account/AccountManagement";
import LandingPage from "../Pages/LandingPage";
import RegisterRole from "../Pages/Auth/RegisterRole";
import Jobs from "../Pages/Admin/Jobs";
import Applies from "../Pages/Admin/Applies";
import ManageAccounts from "../Pages/Admin/ManageAccounts";
import Analytics from "../Pages/Admin/Analytics";
import AdminLogin from "../Pages/Auth/AdminLogin";
import Profile from "../Pages/Applicant/Profile";
import RecruiterProfile from "../Pages/Recruiter/Profile";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/admin", element: <Navigate to={"/admin/analytics"} replace /> },
      { path: "/admin/login", element: <ProtectedRoute Component={AdminLogin} isAdmin /> },
      { path: "/admin/analytics", element: <ProtectedRoute Component={Analytics} isAdmin /> },
      { path: "/admin/jobs", element: <ProtectedRoute Component={Jobs} isAdmin /> },
      { path: "/admin/applies", element: <ProtectedRoute Component={Applies} isAdmin /> },
      { path: "/admin/accounts", element: <ProtectedRoute Component={ManageAccounts} isAdmin /> },
      { path: "/signup/role", element: <ProtectedRoute Component={RegisterRole} /> },
      { path: "/search", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/applicants/jobs", element: <ProtectedRoute Component={ApplicantJobs} onlyApplicant /> },
      { path: "/applicants/:id", element: <ProtectedRoute Component={Profile} /> },
      { path: "/recruiters/jobs", element: <ProtectedRoute Component={RecruiterJobs} onlyRecruiter /> },
      { path: "/recruiters/jobs/:id", element: <ProtectedRoute Component={RecruiterJobDetail} onlyRecruiter /> },
      { path: "/recruiters/post-job", element: <ProtectedRoute Component={CreateJob} onlyRecruiter /> },
      { path: "/recruiters/:id", element: <ProtectedRoute Component={RecruiterProfile} /> },
      { path: "/account", element: <ProtectedRoute Component={AccountManagement} /> },
      { path: "/jobs/:id", element: <ProtectedRoute Component={JobDetail} /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Regiter /> },
    ],
  },
]);
export default router;
