import axios from 'axios';

const API_URL = 'http://localhost:5000/api/dashboard';

export const getUserDashboard = async (token) => {
    const response = await axios.get(`${API_URL}/user-dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const getAdminDashboard = async (token) => {
    const response = await axios.get(`${API_URL}/admin-dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export default{getUserDashboard , getAdminDashboard}