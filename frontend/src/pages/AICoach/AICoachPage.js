import React, { useState } from "react";

import Sidebar from "../../components/layout/Sidebar";

import API from "../../services/api";

function AICoachPage() {

    const [message, setMessage] = useState("");

    const [reply, setReply] = useState("");

    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        if (!message.trim()) {

            alert(
                "Enter a question"
            );

            return;
        }

        try {

            setLoading(true);

            const response = await API.post(

                "/chatbot/chat",

                {
                    message: message
                }

            );

            setReply(
                response.data.reply
            );

        }

        catch (error) {

            console.log(error);

            alert(
                "Failed to get AI response"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">

                    <h1 className="text-5xl font-black">

                        🤖 AI Coach

                    </h1>

                    <p className="mt-3 text-violet-100">

                        Ask fitness, workout and diet questions.

                    </p>

                </div>

                <div className="bg-white rounded-3xl p-8 shadow-lg mt-8">

                    <textarea

                        value={message}

                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }

                        rows={5}

                        placeholder="Ask your fitness question..."

                        className="w-full border rounded-2xl p-5 outline-none"

                    />

                    <button

                        onClick={askAI}

                        disabled={loading}

                        className="mt-5 bg-violet-600 text-white px-8 py-3 rounded-2xl font-bold"

                    >

                        {

                            loading

                            ?

                            "Thinking..."

                            :

                            "Ask AI"

                        }

                    </button>

                </div>

                {

                    reply && (

                        <div className="bg-white rounded-3xl p-8 shadow-lg mt-8">

                            <h2 className="text-2xl font-bold text-violet-600 mb-4">

                                AI Response

                            </h2>

                            <div className="whitespace-pre-wrap leading-relaxed">

                                {reply}

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default AICoachPage;