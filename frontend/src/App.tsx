import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import Home from "./pages/Home.tsx";
import Jobs from "./pages/Jobs.tsx";
import Job from "./pages/Job.tsx";
import About from "./pages/About.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Profile from "./pages/Profile.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import UpdateProfile from "./pages/UpdateProfile.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Applications from "./pages/Applications.tsx";
import ManageJobs from "./pages/ManageJobs.tsx";
import Users from "./pages/Users.tsx";
import AdminRoute from "./routes/AdminRoute.tsx";
import CreateJob from "./pages/CreateJob.tsx";
import UpdateJob from "./pages/UpdateJob.tsx";
import CreateUser from "./pages/CreateUser.tsx";


function App() {
  return (
    <>
      {/* Public Route */}
      <Routes>
        <Route element={<MainLayout />}>
          {/* Routes accessible with a token  */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/jobs/:id" element={<Job />} />
          <Route path="/about" element={<About />} />

          {/* Routes only accessible without a token */}
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        {/* Private Route */}
        <Route element={<DashboardLayout />}>
          {/* Routes only accessible with a token */}
          <Route element={<PrivateRoute />}>
            {/* Routes accessible for both applicants and admin */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/applications" element={<Applications />} />

            {/* Routes accessible for only admin */}
            <Route element={<AdminRoute />}>
              <Route path="/manage-jobs" element={<ManageJobs />} />
              <Route path="/create-job" element={<CreateJob />} />
              <Route path="/update-job/:id" element={<UpdateJob />} />
              <Route path="/users" element={<Users />} />
              <Route path="/create-user" element={<CreateUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      {/* Toastify */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
