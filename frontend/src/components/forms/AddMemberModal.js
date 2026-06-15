import { useState } from "react";

import { X, UserPlus } from "lucide-react";

import API from "../../services/api";

function AddMemberModal({

    closeModal,
    refreshMembers

}) {

    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

const [formData, setFormData] = useState({

    full_name: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male",
    membership_plan: "1 Month",
    membership_category: "Silver",
    height: "",
    weight: "",
    goal: "",
    membership_start_date: "",
    membership_end_date: "",

    bmi: "",
    fitness_status: "",
    daily_calories: "",
    workout_plan: ""

});
    // INPUT CHANGE

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const generateAIPlan = async () => {

    try {

        setAiLoading(true);

        const response = await API.post(
            "/ai/generate-plan",
            {
                age: formData.age,
                height: formData.height,
                weight: formData.weight,
                goal: formData.goal
            }
        );

        const result = response.data;

        setFormData({
            ...formData,

            bmi: result.bmi || "",

            fitness_status:
                result.fitness_status || "",

            daily_calories:
                result.daily_calories || "",

            workout_plan:
                result.workout_plan || ""
        });

    }

    catch (error) {

        console.log(error);

        alert("AI Generation Failed");

    }

    finally {

        setAiLoading(false);

    }

};

    // SUBMIT

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await API.post(

                "/members/add",

                formData

            );

            refreshMembers();

            closeModal();

        }

        catch (error) {

            console.log(error);

            alert("Failed to add member");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5">

            <div className="w-full max-w-5xl bg-white rounded-[35px] shadow-2xl overflow-hidden animate-fadeIn max-h-[95vh] overflow-y-auto">

                {/* HEADER */}

                <div className="bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 p-8 flex items-center justify-between">

                    <div>

                        <h2 className="text-4xl font-black text-white">

                            Add New Member

                        </h2>

                        <p className="text-violet-100 mt-2 text-lg">

                            Premium Gym Membership Registration

                        </p>

                    </div>

                    <button

                        onClick={closeModal}

                        className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"

                    >

                        <X size={24} />

                    </button>

                </div>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="p-10"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* FULL NAME */}

                        <div>

                            <label className="block text-lg font-bold mb-3">

                                Full Name

                            </label>

                            <input

                                type="text"

                                name="full_name"

                                value={formData.full_name}

                                onChange={handleChange}

                                required

                                placeholder="Enter member name"

                                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                            />

                        </div>

                        {/* EMAIL */}

                        <div>

                            <label className="block text-lg font-bold mb-3">

                                Email Address

                            </label>

                            <input

                                type="email"

                                name="email"

                                value={formData.email}

                                onChange={handleChange}

                                required

                                placeholder="Enter email"

                                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                            />

                        </div>

                        {/* PHONE */}

                        <div>

                            <label className="block text-lg font-bold mb-3">

                                Phone Number

                            </label>

                            <input

                                type="text"

                                name="phone"

                                value={formData.phone}

                                onChange={handleChange}

                                placeholder="Enter phone number"

                                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                            />

                        </div>

                        {/* AGE */}

                        <div>

                            <label className="block text-lg font-bold mb-3">

                                Age

                            </label>

                            <input

                                type="number"

                                name="age"

                                value={formData.age}

                                onChange={handleChange}

                                placeholder="Enter age"

                                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                            />

                        </div>

                        {/* GENDER */}

                        <div>

                            <label className="block text-lg font-bold mb-3">

                                Gender

                            </label>

                            <select

                                name="gender"

                                value={formData.gender}

                                onChange={handleChange}

                                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                            >

                                <option>Male</option>

                                <option>Female</option>

                            </select>

                        </div>

                        {/* DURATION */}

                        <div>

                            <label className="block text-lg font-bold mb-3">

                                Membership Duration

                            </label>

                            <select

                                name="membership_plan"

                                value={formData.membership_plan}

                                onChange={handleChange}

                                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                            >

                                <option>Trial</option>
<option>Custom</option>
<option>1 Month</option>
<option>2 Months</option>
<option>3 Months</option>
<option>6 Months</option>
<option>1 Year</option>

                            </select>

                        </div>

                        {/* CATEGORY */}

                        <div>

                            <label className="block text-lg font-bold mb-3">

                                Membership Category

                            </label>

                            <select

                                name="membership_category"

                                value={formData.membership_category}

                                onChange={handleChange}

                                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                            >

                                <option>Silver</option>

                                <option>Gold</option>

                                <option>Platinum</option>

                                <option>Premium</option>

                            </select>

                        </div>

                        {/* HEIGHT */}

                        <div>

                            <label className="block text-lg font-bold mb-3">

                                Height (CM)

                            </label>

                            <input

                                type="number"

                                name="height"

                                value={formData.height}

                                onChange={handleChange}

                                placeholder="Enter height"

                                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                            />

                        </div>

                        {/* WEIGHT */}

                        <div>

                            <label className="block text-lg font-bold mb-3">

                                Weight (KG)

                            </label>

                            <input

                                type="number"

                                name="weight"

                                value={formData.weight}

                                onChange={handleChange}

                                placeholder="Enter weight"

                                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                            />

                        </div>

                    </div>


{formData.membership_plan === "Custom" && (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

        <div>

            <label className="block text-lg font-bold mb-3">

                Membership Start Date

            </label>

            <input

                type="date"

                name="membership_start_date"

                value={formData.membership_start_date}

                onChange={handleChange}

                required

                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

            />

        </div>

        <div>

            <label className="block text-lg font-bold mb-3">

                Membership End Date

            </label>

            <input

                type="date"

                name="membership_end_date"

                value={formData.membership_end_date}

                onChange={handleChange}

                required

                className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

            />

        </div>

    </div>

)}
                    {/* GOAL */}

                    <div className="mt-8">

                        <label className="block text-lg font-bold mb-3">

                            Fitness Goal

                        </label>

                        <input

                            type="text"

                            name="goal"

                            value={formData.goal}

                            onChange={handleChange}

                            placeholder="Weight Loss / Muscle Gain / Fitness"

                            className="w-full h-16 px-6 rounded-2xl border border-gray-200 outline-none focus:border-violet-500 text-lg"

                        />

                    </div>

                    <div className="mt-6">

    <button

        type="button"

        onClick={generateAIPlan}

        disabled={aiLoading}

        className="h-14 px-8 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold"

    >

        {

            aiLoading

            ?

            "Generating AI Assessment..."

            :

            "🤖 Generate AI Assessment"

        }

    </button>

</div>

{
formData.bmi && (

<div className="mt-8 p-6 rounded-3xl bg-gray-50 border">

    <h3 className="text-2xl font-bold mb-5">

        AI Fitness Report
    </h3>

    <div className="space-y-3">

        <p>
            <strong>BMI:</strong>
            {formData.bmi}
        </p>

        <p>
            <strong>Status:</strong>
            {formData.fitness_status}
        </p>

        <p>
            <strong>Calories:</strong>
            {formData.daily_calories}
        </p>

        <p>
            <strong>Workout:</strong>
            {formData.workout_plan}
        </p>

    </div>

</div>

)}
                    {/* BUTTONS */}

                    <div className="flex justify-end gap-5 mt-10">

                        <button

                            type="button"

                            onClick={closeModal}

                            className="h-14 px-10 rounded-2xl border border-gray-300 text-gray-700 font-bold text-lg hover:bg-gray-100 transition"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={loading}

                            className="h-14 px-10 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg flex items-center gap-3 hover:scale-[1.02] transition shadow-xl"

                        >

                            <UserPlus size={22} />

                            {

                                loading

                                ?

                                "Adding..."

                                :

                                "Add Member"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddMemberModal;