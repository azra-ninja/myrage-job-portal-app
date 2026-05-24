import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import Home from "./pages/Home.tsx";
import Jobs from "./pages/Jobs.tsx";
import About from "./pages/About.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  return (
    <>
     {/* Public Route */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<Jobs />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        {/* Private Route */}
        <Route element={<DashboardLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
