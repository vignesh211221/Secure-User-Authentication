import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardService from '../services/dashboardService';
import '../styles/Dashboard.css'; 

const AdminDashboard = () => {
    const [message, setMessage] = useState('');
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dashboardService.getAdminDashboard(token);
                setAdminName(data.username || "Admin");
            } catch (error) {
                setMessage('Access Denied or Unauthorized');
            }
        };
        fetchData();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <div className="dashboard-container">
                <span className="welcome-text">Welcome Admin,{adminName}!</span> 
                <span className="dashboard-title">Admin Dashboard</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className='paragraph'>
                <p>Hello {adminName}</p>
                <p>This is Your AdminDashboard</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
