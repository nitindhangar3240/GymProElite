import { useState } from "react";

import {
    Dumbbell,
    Eye,
    EyeOff
} from "lucide-react";

import API from "../../services/api";
import Swal from "sweetalert2";
function LoginPage() {

    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
     const [showPassword, setShowPassword] =
    useState(false);
    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

           localStorage.setItem(
    "token",
    response.data.access_token
);

localStorage.setItem(
    "user",
    JSON.stringify(
        response.data.user
    )
);

Swal.fire({

    toast: true,

    position: "top-end",

    icon: "success",

    title: "Login Successful !",

    showConfirmButton: false,

    timer: 1800,

    timerProgressBar: true

});

setTimeout(() => {

    window.location.href =
        "/dashboard";

}, 1200);

        }

        catch (err) {

            setError(
                "Invalid Email or Password"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex">

            {/* LEFT SIDE */}

            <div className="w-1/2 bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white p-16 flex flex-col justify-between relative overflow-hidden">

                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">

                    <h1 className="text-5xl font-black mb-4">
                        <div className="flex items-center gap-4 mb-5">

    <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center">

        <Dumbbell
            size={30}
            className="text-white"
        />

    </div>

    <div>

        <h1 className="text-5xl font-black text-white">

            GymPro Elite

        </h1>

        <p className="text-purple-100">

            AI Fitness Platform

        </p>

    </div>

</div>
                    </h1>

                    <p className="text-xl text-purple-100 leading-relaxed">

                        Premium AI Powered Gym Management Platform for modern fitness businesses.

                    </p>

                </div>

                <div className="relative z-10">

                    <img
                        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
                        alt="gym"
                        className="rounded-3xl shadow-2xl border border-white/20"
                    />

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="w-1/2 bg-white flex items-center justify-center px-20">

                <div className="w-full max-w-md">

                    <div className="mb-10">

                        <h2 className="text-4xl font-black text-gray-900 mb-3">
                            Welcome Back
                        </h2>

                        <p className="text-gray-500 text-lg">
                            Login to continue managing your gym.
                        </p>

                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-6"
                    >

                        <div>

                            <label className="block mb-2 font-semibold text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                                className="w-full h-14 rounded-2xl border border-gray-200 px-5 text-lg focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
                                placeholder="admin@gmail.com"
                            />

                        </div>

                        <div>

                           <label className="block mb-2 font-semibold text-gray-700">
    Password
</label>

<div className="relative">

    <input
        type={
            showPassword
                ? "text"
                : "password"
        }
        value={password}
        onChange={(e) =>
            setPassword(e.target.value)
        }
        required
        className="w-full h-14 rounded-2xl border border-gray-200 px-5 text-lg focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
        placeholder="••••••••"
    />

    <button
        type="button"
        onClick={() =>
            setShowPassword(
                !showPassword
            )
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
    >

        {

            showPassword

                ?

                <EyeOff size={20} />

                :

                <Eye size={20} />

        }

    </button>

</div>

                        </div>

                        {

                            error && (

                                <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                                    {error}
                                </div>

                            )

                        }
<div className="flex justify-end">

    <button
        type="button"
        className="text-violet-600 font-semibold hover:text-violet-700"
    >

        Forgot Password?

    </button>

</div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-600 text-white text-lg font-bold hover:scale-[1.02] transition duration-300 shadow-xl"
                        >

                            {

                                loading
                                    ? "Logging in..."
                                    : "Login"

                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default LoginPage;