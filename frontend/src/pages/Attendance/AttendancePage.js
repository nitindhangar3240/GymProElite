import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import API from "../../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AttendancePage() {

  const [attendance, setAttendance] = useState([]);
const [members, setMembers] = useState([]);
const [memberSearch, setMemberSearch] = useState("");
const [attendanceSearch, setAttendanceSearch] =
    useState("");

    const today = new Date()
    .toLocaleDateString(
        "en-CA",
        {
            timeZone: "Asia/Kolkata"
        }
    );

    const fetchAttendance = async () => {

        try {

            const response =
                await API.get("/attendance/");

            setAttendance(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const fetchMembers = async () => {

        try {

            const response =
                await API.get("/members/");

            setMembers(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };
useEffect(() => {

    fetchAttendance();

    fetchMembers();

    const refreshInterval = setInterval(() => {

        fetchAttendance();

        fetchMembers();

    }, 60000);

    const now = new Date();

    const midnight = new Date();

    midnight.setHours(
        24,
        0,
        0,
        0
    );

    const msUntilMidnight =
        midnight.getTime() -
        now.getTime();

    const midnightRefresh =
        setTimeout(() => {

            fetchAttendance();

            fetchMembers();

            window.location.reload();

        }, msUntilMidnight);

    return () => {

        clearInterval(
            refreshInterval
        );

        clearTimeout(
            midnightRefresh
        );

    };

}, []);

    const markAttendance = async (member) => {

        try {

            await API.post(
                "/attendance/checkin",
                {
                    member_id: member.id,
                    member_name: member.full_name
                }
            );

            await fetchAttendance();

            alert(
                "Attendance Marked Successfully"
            );

        }

        catch (error) {

            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {

                alert(
                    error.response.data.error
                );

            }

            else {

                alert(
                    "Failed To Mark Attendance"
                );

            }

        }

    };

    const handleCheckout = async (id) => {
               
        try {

            await API.put(
                `/attendance/checkout/${id}`
            );

            await fetchAttendance();

            alert(
                "Checkout Successful"
            );

        }

        catch (error) {

            console.log(error);

            alert(
                "Checkout Failed"
            );

        }

        };

    const generateAttendancePDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(20);

        doc.text(
            "GymPro Attendance Report",
            14,
            20
        );

        doc.setFontSize(12);

        doc.text(
            `Date: ${today}`,
            14,
            30
        );

        autoTable(doc, {

            startY: 40,

            head: [[
                "Member",
                "Date",
                "Check In",
                "Check Out",
                "Status"
            ]],

            body: attendance.map(
                (record) => [

                    record.member_name,
                    record.date,
                    record.check_in_time,
                    record.check_out_time || "--",
                    record.status

                ]
            )

        });

        doc.save(
            `Attendance_Report_${today}.pdf`
        );

    };

    const filteredMembers = members

    .filter(

        (member) => {

            const alreadyMarkedToday =
                attendance.some(

                    (record) =>

                        Number(record.member_id) ===
                        Number(member.id)

                        &&

                        record.date === today

                );

            return !alreadyMarkedToday;

        }

    )

    .filter(

        (member) =>

            member.full_name
                ?.toLowerCase()
                .includes(
                    memberSearch.toLowerCase()
                )

    );

    const filteredAttendance =
    attendance.filter(
        (record) =>
            record.member_name
                ?.toLowerCase()
                .includes(
                    attendanceSearch.toLowerCase()
                )
    );
    return (

        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-5xl font-black text-violet-700 mb-2">

                    Attendance Management

                </h1>

                <p className="text-gray-500 mb-8">

                    Track and manage daily member attendance

                </p>

                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                    <div className="bg-white rounded-3xl p-6 shadow-xl">

                        <h3 className="text-gray-500 text-lg">

                            Present Today

                        </h3>

                        <h1 className="text-5xl font-black text-violet-600 mt-3">

                            {

                                attendance.filter(

                                    (record) =>

                                        record.date === today

                                ).length

                            }

                        </h1>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-xl">

                        <h3 className="text-gray-500 text-lg">

                            Total Members

                        </h3>

                        <h1 className="text-5xl font-black text-indigo-600 mt-3">

                            {members.length}

                        </h1>

                    </div>

                </div>

                {/* MARK ATTENDANCE */}

                <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

                    <div className="flex justify-between items-center mb-5">

    <h2 className="text-2xl font-bold">

        Mark Attendance

    </h2>

    <input

        type="text"

        placeholder="Search member..."

        value={memberSearch}

        onChange={(e) =>
            setMemberSearch(
                e.target.value
            )
        }

        className="border border-gray-300 rounded-xl px-4 py-2 w-72 outline-none focus:border-violet-500"

    />

</div>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left p-4">

                                    Member Name

                                </th>

                                <th className="text-left p-4">

                                    Membership

                                </th>

                                <th className="text-left p-4">

                                    Status

                                </th>

                                <th className="text-left p-4">

                                    Action

                                </th>

                            </tr>

                        </thead>

                        <tbody>

{

    filteredMembers.map((member) => (

        <tr
            key={member.id}
            className="border-b hover:bg-violet-50"
        >

            <td className="p-4 font-semibold">

                {member.full_name}

            </td>

            <td className="p-4">

                {member.membership_category}

            </td>

            <td className="p-4">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                    {member.status}

                </span>

            </td>

            <td className="p-4">

                <button

                    onClick={() =>
                        markAttendance(member)
                    }

                    className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl font-semibold"

                >

                    Present

                </button>

            </td>

        </tr>

    ))

}

</tbody>

                    </table>

                </div>

                {/* ATTENDANCE RECORDS */}

                <div className="bg-white rounded-3xl shadow-xl p-6">

                    <div className="flex justify-between items-center mb-5">

   <div className="flex items-center gap-4">

    <h2 className="text-2xl font-bold">

        Attendance Records

    </h2>

    <input

        type="text"

        placeholder="Search records..."

        value={attendanceSearch}

        onChange={(e) =>
            setAttendanceSearch(
                e.target.value
            )
        }

        className="border border-gray-300 rounded-xl px-4 py-2 w-72 outline-none focus:border-violet-500"

    />

</div>

    <button
        onClick={generateAttendancePDF}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-semibold"
    >

        Download PDF

    </button>

</div>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left p-4">

                                    Member

                                </th>

                                <th className="text-left p-4">

                                    Date

                                </th>

                                <th className="text-left p-4">

                                    Check In

                                </th>

                                <th className="text-left p-4">

                                    Check Out

                                </th>

                                <th className="text-left p-4">

                                    Status

                                </th>

                                <th className="text-left p-4">

                                    Action

                                </th>

                            </tr>

                        </thead>

                       <tbody>

{
    filteredAttendance.map((record) => (

        <tr
            key={record.id}
            className="border-b"
        >

            <td className="p-4">

                {record.member_name}

            </td>

            <td className="p-4">

                {record.date}

            </td>

            <td className="p-4">

                {record.check_in_time}

            </td>

            <td className="p-4">

                {
                    record.check_out_time
                        ? record.check_out_time
                        : "--"
                }

            </td>

            <td className="p-4">

                {
                    record.status === "Completed"

                        ? (

                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                                Completed

                            </span>

                        )

                        : (

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                                Present

                            </span>

                        )
                }

            </td>

            <td className="p-4">

                {
                    !record.check_out_time && (

                        <button

                            onClick={() =>
                                handleCheckout(
                                    record.id
                                )
                            }

                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold"

                        >

                            Check Out

                        </button>

                    )
                }

            </td>

        </tr>

    ))
}

</tbody>
                    </table>

                </div>

            </div>

        </div>

    );

}

export default AttendancePage;