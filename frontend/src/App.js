import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import MembersPage from "./pages/Member/MembersPage";
import AttendancePage from "./pages/Attendance/AttendancePage";
import AICoachPage from "./pages/AICoach/AICoachPage";

function App() {

    const token = localStorage.getItem(
        "token"
    );

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        token
                            ? <DashboardPage />
                            : <Navigate to="/" />
                    }
                />

                <Route
                    path="/members"
                    element={
                        token
                            ? <MembersPage />
                            : <Navigate to="/" />
                    }
                />

                <Route
                    path="/attendance"
                    element={
                        token
                            ? <AttendancePage />
                            : <Navigate to="/" />
                    }
                />

                <Route
                    path="/ai-coach"
                    element={
                        token
                            ? <AICoachPage />
                            : <Navigate to="/" />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;