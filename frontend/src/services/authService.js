import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const register = async (username, email, password, role) => {
    return axios.post(`${API_URL}/register`, { username, email, password, role });
};

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response?.data?.token && response?.data?.role) {
        return response.data; 
    } else {
        throw new Error("Invalid login response from server");
    }
};

const forgotPassword = async (email) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
  };
  
  const resetPassword = async (token, password) => {
    return axios.put(`${API_URL}/reset-password/${token}`, { password });
  };
  

export default { register, login, forgotPassword, resetPassword };
