import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardService  from '../services/dashboardService';
import '../styles/Dashboard.css';
 

const UserDashboard = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dashboardService.getUserDashboard(token);
                setUsername(data.username || "User");
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
                <span className="welcome-text">Welcome, {username}!</span>
                <span className="dashboard-title">User Dashboard</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className='paragraph'>
                <p>Hello {username}</p>
                <p>This is Your  UserDashboard</p>
            </div>
        </div>
    );
};

export default UserDashboard;
