import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await authService.login(email, password);
            console.log("Login Response:", response); 

            if (response?.token && response?.role) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("role", response.role);
                navigate(response.role === "user" ? "/user-dashboard" : "/admin-dashboard");
            } else {
                setError("Login failed: Invalid response from server");
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <div className="card">
                <h2>Login</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br></br>
                    <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                    <br></br>
                    <br></br>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <a href="/register" className="login-link">Register</a></p>
            </div>
        </div>
    );
};

export default Login;