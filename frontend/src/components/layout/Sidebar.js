import {
    LayoutDashboard,
    Users,
    LogOut,
    Dumbbell,
    CalendarDays,
    Bot
} from "lucide-react";

import {
    Link,
    useLocation
} from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";

    };

    const menuItems = [

        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard"
        },

        {
            name: "Members",
            icon: Users,
            path: "/members"
        },

        {
            name: "Attendance",
            icon: CalendarDays,
            path: "/attendance"
        },

        {
            name: "AI Coach",
            icon: Bot,
            path: "/ai-coach"
        }

    ];

    return (

        <div className="w-[290px] min-h-screen bg-white/80 backdrop-blur-xl border-r border-gray-100 shadow-2xl flex flex-col justify-between p-6">

            <div>

                {/* LOGO */}

                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-6 mb-10 shadow-xl">

                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="flex items-center gap-4 relative z-10">

                        <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center">

                            <Dumbbell
                                size={30}
                                className="text-white"
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl font-black text-white">

                                GymPro Elite

                            </h1>

                            <p className="text-violet-100 text-sm">

                                AI Fitness Platform

                            </p>

                        </div>

                    </div>

                </div>

                {/* MENU */}

                <div className="space-y-3">

                    {

                        menuItems.map((item) => {

                            const Icon = item.icon;

                            const active =
                                location.pathname === item.path;

                            return (

                                <Link

                                    key={item.name}

                                    to={item.path}

                                    className={

                                        active

                                            ?

                                            "flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg"

                                            :

                                            "flex items-center gap-4 p-4 rounded-2xl text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-all duration-300"

                                    }

                                >

                                    <Icon size={22} />

                                    <span className="font-semibold">

                                        {item.name}

                                    </span>

                                </Link>

                            );

                        })

                    }

                </div>

                {/* AI CARD */}

                <div className="mt-10">

                    <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 p-5 text-white shadow-xl">

                        <h3 className="font-bold text-lg">

                            GymPro AI

                        </h3>

                        <p className="text-sm mt-2 text-cyan-100">

                            Smart member insights,
                            fitness analytics,
                            AI coaching and
                            growth tracking.

                        </p>

                    </div>

                </div>

            </div>

            {/* LOGOUT */}

            <button

                onClick={handleLogout}

                className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-300 font-semibold"

            >

                <LogOut size={20} />

                Logout

            </button>

        </div>

    );

}

export default Sidebar;