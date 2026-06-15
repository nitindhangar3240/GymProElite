import Sidebar from "../../components/layout/Sidebar";

import {
    Users,
    Crown,
    Wallet,
    Activity
} from "lucide-react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

import { useEffect, useState } from "react";

import API from "../../services/api";

function DashboardPage() {

const [attendanceChart, setAttendanceChart] = useState([]);
const [revenueChart, setRevenueChart] = useState([]);

const [stats, setStats] = useState({

    total_members: 0,

    premium_members: 0,

    active_members: 0,

    total_revenue: 0,

    today_attendance: 0,

    expiring_soon: 0,

    expired_members: 0,

    expiring_members: [],

    expired_member_list: [],

average_bmi: 0,

weight_gain_members: 0,

weight_loss_members: 0,

healthy_members: 0,

underweight_members: 0
});

const fetchDashboard = async () => {

    try {

        const response = await API.get(
            "/dashboard/"
        );

        setStats(
            response.data
        );

    }

    catch (error) {

        console.log(error);

    }

};      
  const fetchAttendanceChart = async () => {



    try {

        const response = await API.get(
            "/dashboard/attendance-chart"
        );

        setAttendanceChart(
            response.data
        );

    }

    catch (error) {

        console.log(error);

    }

};
 useEffect(() => {

    fetchDashboard();

    fetchAttendanceChart();

    fetchRevenueChart();

}, []);

const fetchRevenueChart = async () => {

    try {

        const response = await API.get(
            "/dashboard/revenue-chart"
        );

        setRevenueChart(
            response.data
        );

    }

    catch (error) {

        console.log(error);

    }

};
    return (

        <div className="flex bg-[#f4f7fb] min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8 overflow-y-auto">

                {/* HERO SECTION */}

                <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-700 via-indigo-600 to-fuchsia-600 p-10 shadow-2xl">

                    <div className="relative z-10">

                        <p className="uppercase tracking-[5px] text-violet-100 text-sm font-semibold mb-4">

                            Premium Gym Management

                        </p>

                        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight max-w-3xl">

                            Build Stronger
                            <br />
                            Fitness Communities

                        </h1>

                        <p className="text-violet-100 text-lg mt-6 max-w-2xl leading-relaxed">

                            Smart analytics, member management,
                            attendance tracking and fitness
                            automation in one modern platform.

                        </p>

                    </div>

                    {/* GLOW EFFECT */}

                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 blur-3xl rounded-full"></div>

                </div>

                {/* STATS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                    {/* CARD 1 */}

                    <div className="bg-white rounded-[28px] p-7 shadow-lg border border-violet-100 hover:shadow-2xl transition duration-300">

                        <div className="flex items-center justify-between mb-6">

                            <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">

                                <Users size={30} />

                            </div>

                            <span className="text-green-500 font-bold text-lg">

                                +12%

                            </span>

                        </div>

                        <h2 className="text-5xl font-black text-gray-800">

                            {stats.total_members}

                        </h2>

                        <p className="text-gray-500 mt-3 text-lg font-medium">

                            Total Members

                        </p>

                    </div>

                    

                    {/* CARD 2 */}

                    <div className="bg-white rounded-[28px] p-7 shadow-lg border border-yellow-100 hover:shadow-2xl transition duration-300">

                        <div className="flex items-center justify-between mb-6">

                            <div className="w-16 h-16 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center">

                                <Crown size={30} />

                            </div>

                            <span className="text-yellow-600 font-bold text-lg">

                                Premium

                            </span>

                        </div>

                        <h2 className="text-5xl font-black text-gray-800">

                            {stats.premium_members}

                        </h2>

                        <p className="text-gray-500 mt-3 text-lg font-medium">

                            Premium Members

                        </p>

                    </div>

                    {/* CARD 3 */}

                    <div className="bg-white rounded-[28px] p-7 shadow-lg border border-green-100 hover:shadow-2xl transition duration-300">

                        <div className="flex items-center justify-between mb-6">

                            <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">

                                <Wallet size={30} />

                            </div>

                            <span className="text-green-500 font-bold text-lg">

                                Revenue

                            </span>

                        </div>

                        <h2 className="text-4xl font-black text-gray-800">

                            ₹{stats.total_revenue}

                        </h2>

                        <p className="text-gray-500 mt-3 text-lg font-medium">

                            Estimated Revenue

                        </p>

                    </div>

                    {/* CARD 4 */}

                    <div className="bg-white rounded-[28px] p-7 shadow-lg border border-indigo-100 hover:shadow-2xl transition duration-300">

                        <div className="flex items-center justify-between mb-6">

                            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">

                                <Activity size={30} />

                            </div>

                            <span className="text-indigo-500 font-bold text-lg">

                                Active

                            </span>

                        </div>

                        <h2 className="text-5xl font-black text-gray-800">

                            {stats.active_members}

                        </h2>

                        <p className="text-gray-500 mt-3 text-lg font-medium">

                            Active Plans

                        </p>

                    </div>

                </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

    <div className="bg-white rounded-[28px] p-6 shadow-lg border border-indigo-100">

        <h2 className="text-4xl font-black text-indigo-600">
            {stats.today_attendance}
        </h2>

        <p className="text-gray-500 mt-2 font-medium">
            Attendance Today
        </p>

    </div>

    <div className="bg-white rounded-[28px] p-6 shadow-lg border border-orange-100">

        <h2 className="text-4xl font-black text-orange-500">
            {stats.expiring_soon}
        </h2>

        <p className="text-gray-500 mt-2 font-medium">
            Expiring Soon
        </p>

    </div>

    <div className="bg-white rounded-[28px] p-6 shadow-lg border border-red-100">

        <h2 className="text-4xl font-black text-red-500">
            {stats.expired_members}
        </h2>

        <p className="text-gray-500 mt-2 font-medium">
            Expired Members
        </p>

    </div>

</div> 

{/* BOTTOM SECTION */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

    {/* EXPIRING MEMBERS */}

    <div className="bg-white rounded-[30px] p-8 shadow-lg">

        <h2 className="text-2xl font-bold text-orange-600 mb-6">

            Expiring Soon

        </h2>

        {

            stats.expiring_members?.length > 0

            ?

            stats.expiring_members.map((member, index) => (

                <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b"
                >

                    <span className="font-semibold">

                        {member.name}

                    </span>

                    <span className="text-orange-500 font-bold">

                        {member.days_left} Days Left

                    </span>

                </div>

            ))

            :

            <p className="text-gray-500">

                No memberships expiring soon

            </p>

        }

    </div>

    {/* EXPIRED MEMBERS */}

    <div className="bg-white rounded-[30px] p-8 shadow-lg">

        <h2 className="text-2xl font-bold text-red-600 mb-6">

            Expired Members

        </h2>

        {

            stats.expired_member_list?.length > 0

            ?

            stats.expired_member_list.map((member, index) => (

                <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b"
                >

                    <span className="font-semibold">

                        {member.name}

                    </span>

                    <span className="text-red-500 font-bold">

                        {member.expired_days} Days Ago

                    </span>

                </div>

            ))

            :

            <p className="text-gray-500">

                No expired memberships

            </p>

        }

    </div>

</div>

{/* WEEKLY ATTENDANCE CHART */}

<div className="mt-8">

    <div className="bg-white rounded-[30px] p-8 shadow-lg">

        <h2 className="text-3xl font-black text-gray-800 mb-8">

            Weekly Attendance Trend

        </h2>

        <div className="h-[350px]">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart
                    data={attendanceChart}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="day"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        radius={[10, 10, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    </div>

</div>

{/* REVENUE CHART */}

<div className="mt-8">

    <div className="bg-white rounded-[30px] p-8 shadow-lg">

        <h2 className="text-3xl font-black text-gray-800 mb-8">

            Revenue by Membership Plan

        </h2>

        <div className="h-[350px]">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart
                    data={revenueChart}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="plan"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="revenue"
                        radius={[10, 10, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    </div>

</div>


{/* AI INSIGHTS */}

<div className="mt-8">

    <h2 className="text-3xl font-black text-gray-800 mb-6">

        🤖 AI Fitness Insights

    </h2>

    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        <div className="bg-white rounded-[28px] p-6 shadow-lg">

            <h3 className="text-gray-500 font-semibold">

                Average BMI

            </h3>

            <h1 className="text-4xl font-black text-blue-600 mt-3">

                {stats.average_bmi}

            </h1>

        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-lg">

            <h3 className="text-gray-500 font-semibold">

                Weight Gain

            </h3>

            <h1 className="text-4xl font-black text-green-600 mt-3">

                {stats.weight_gain_members}

            </h1>

        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-lg">

            <h3 className="text-gray-500 font-semibold">

                Weight Loss

            </h3>

            <h1 className="text-4xl font-black text-red-600 mt-3">

                {stats.weight_loss_members}

            </h1>

        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-lg">

            <h3 className="text-gray-500 font-semibold">

                Healthy Members

            </h3>

            <h1 className="text-4xl font-black text-indigo-600 mt-3">

                {stats.healthy_members}

            </h1>

        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-lg">

            <h3 className="text-gray-500 font-semibold">

                Underweight

            </h3>

            <h1 className="text-4xl font-black text-orange-500 mt-3">

                {stats.underweight_members}

            </h1>

        </div>

    </div>

</div>
{/* GYM AI SECTION */}

<div className="mt-8">

    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[30px] p-8 shadow-2xl text-white">

        <h2 className="text-3xl font-black mb-4">

            GymPro AI

        </h2>

        <p className="text-violet-100 text-lg leading-relaxed">

            Track members, manage plans,
            monitor revenue and build a
            premium fitness ecosystem
            with intelligent automation.

        </p>

        <button className="mt-8 bg-white text-violet-700 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition">

            Explore Features

        </button>

    </div>

</div>

            </div>

        </div>

    );

}

export default DashboardPage;