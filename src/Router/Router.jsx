import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJob from "../Pages/Jobs/CreateJob";
import MyJob from "../Pages/Jobs/MyJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/post-job", element: <CreateJob /> },
      { path: "/my-job", element: <MyJob /> },
    ],
  },
]);
export default router;
