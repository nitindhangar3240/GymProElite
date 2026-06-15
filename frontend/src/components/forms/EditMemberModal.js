import { useState } from "react";

import API from "../../services/api";

import { X } from "lucide-react";

function EditMemberModal({

    member,

    refreshMembers,

    closeModal

}) {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

    full_name: member.full_name || "",

    phone: member.phone || "",

    membership_plan:
        member.membership_plan || "1 Month",

    membership_category:
        member.membership_category || "Silver",

    goal: member.goal || ""

});
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await API.put(

                `/members/update/${member.id}`,

                formData

            );

            await refreshMembers();
            closeModal();

        }

        catch (error) {

    console.log(error);

    alert(

        error?.response?.data?.error ||

        error.message ||

        "Failed to update member"

    );

}

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="relative w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-[40px] shadow-2xl bg-white">

                {/* HEADER */}

                <div className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-10 py-8">

                    <button

                        onClick={closeModal}

                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center text-white"

                    >

                        <X size={24} />

                    </button>

                    <h1 className="text-4xl font-black text-white mb-2">

                        Update Member

                    </h1>

                    <p className="text-violet-100 text-lg">

                        Update Membership Information

                    </p>

                </div>

                {/* FORM */}

               <form
    onSubmit={handleSubmit}
    className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
>

                    {/* NAME */}

                    <div>

                        <label className="block text-gray-700 font-semibold mb-3">

                            Full Name

                        </label>

                        <input

                            type="text"

                            name="full_name"

                            value={formData.full_name}

                            onChange={handleChange}

                            required

                            className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-200"

                        />

                    </div>

                    {/* PHONE */}

                    <div>

                        <label className="block text-gray-700 font-semibold mb-3">

                            Phone

                        </label>

                        <input

                            type="text"

                            name="phone"

                            value={formData.phone}

                            onChange={handleChange}

                            required

                            className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-200"

                        />

                    </div>

                    {/* PLAN */}

                    <div>

                        <label className="block text-gray-700 font-semibold mb-3">

                            Membership Plan

                        </label>

                        <select

                            name="membership_plan"

                            value={formData.membership_plan}

                            onChange={handleChange}

                            className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-200"

                        >

                            <option value="1 Month">
                                1 Month
                            </option>

                            <option value="2 Months">
                                2 Months
                            </option>

                            <option value="3 Months">
                                3 Months
                            </option>

                            <option value="6 Months">
                                6 Months
                            </option>

                            <option value="1 Year">
                                1 Year
                            </option>

                        </select>

                    </div>

                    <div>

    <label className="block text-gray-700 font-semibold mb-3">

        Membership Category

    </label>

    <select

        name="membership_category"

        value={formData.membership_category}

        onChange={handleChange}

        className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-200"

    >

        <option value="Silver">
            Silver
        </option>

        <option value="Gold">
            Gold
        </option>

        <option value="Platinum">
            Platinum
        </option>

        <option value="Premium">
            Premium
        </option>

    </select>

</div>

                    {/* GOAL */}

                    <div>

                        <label className="block text-gray-700 font-semibold mb-3">

                            Fitness Goal

                        </label>

                        <input

                            type="text"

                            name="goal"

                            value={formData.goal}

                            onChange={handleChange}

                            className="w-full h-14 px-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-violet-200"

                        />

                    </div>


{/* AI FITNESS REPORT */}

<div className="md:col-span-2">

    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-6">

        <h2 className="text-2xl font-bold text-green-700 mb-5">

            🤖 AI Fitness Report

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="bg-white rounded-2xl p-4 shadow-sm">

                <p className="text-gray-500 text-sm">

                    BMI

                </p>

                <h3 className="text-3xl font-black text-green-600">

                    {member.bmi || "N/A"}

                </h3>

            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">

                <p className="text-gray-500 text-sm">

                    Fitness Status

                </p>

                <h3 className="text-xl font-bold text-blue-600">

                    {member.fitness_status || "N/A"}

                </h3>

            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">

                <p className="text-gray-500 text-sm">

                    Daily Calories

                </p>

                <h3 className="text-2xl font-black text-orange-600">

                    {member.daily_calories || 0} kcal

                </h3>

            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">

                <p className="text-gray-500 text-sm">

                    Workout Plan

                </p>

                <h3 className="text-lg font-bold text-violet-600">

                    {member.workout_plan || "N/A"}

                </h3>

            </div>

        </div>
<div className="mt-6 flex justify-center">

    <button

        type="button"

        onClick={() =>

            window.open(

                `http://localhost:5000/api/report/member/${member.id}`,

                "_blank"

            )

        }

        className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"

    >

        📄 Download Fitness Report

    </button>

</div>
    </div>

</div>
                    {/* BUTTONS */}

                    <div className="md:col-span-2 flex justify-end gap-4 pt-4">

                        <button

                            type="button"

                            onClick={closeModal}

                            className="px-8 h-14 rounded-2xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={loading}

                            className="px-10 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:scale-105 transition"

                        >

                            {

                                loading

                                ? "Updating..."

                                : "Update Member"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditMemberModal;