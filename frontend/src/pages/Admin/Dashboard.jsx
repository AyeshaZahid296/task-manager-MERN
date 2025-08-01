import React, { useEffect, useState } from 'react';
import { useUserAuth } from "../../hooks/useUserAuth";
import { useContext } from 'react';
import { UserContext } from "../../context/userContext";
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Dashboard = () => {
    useUserAuth();

    const { user } = useContext(UserContext);

    const navugate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    const getDashboardData = async () => {
        try {
            const respose = await axiosInstance.get(
                API_PATHS.TASKS.GET_DASHBOARD_DATA
            );
            if (respose.data) {
                setDashboardData(respose.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getDashboardData();

        return () => { };
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            {JSON.stringify(dashboardData)}
        </DashboardLayout>
    )
};

export default Dashboard;