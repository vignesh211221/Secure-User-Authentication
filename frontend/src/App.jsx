import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashBoard from "./pages/AdminDashBoard";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = ()=>{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route element={<PrivateRoute roles={["user"]} />}/>
        <Route path="/user-dashboard" element={<UserDashboard />}/>
        <Route element={<PrivateRoute roles={["admin"]} />}/>
        <Route path="/admin-dashboard" element={<AdminDashBoard />}/>
      </Routes>
    </Router>
  )
}

export default App;