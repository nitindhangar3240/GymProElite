import google.generativeai as genai
import json

genai.configure(
    api_key="import os"
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


# =====================================
# FITNESS PLAN GENERATOR
# =====================================

def generate_fitness_plan(
    age,
    height,
    weight,
    goal
):

    prompt = f"""
You are a professional fitness coach.

Return ONLY valid JSON.

Age: {age}
Height: {height}
Weight: {weight}
Goal: {goal}

Return exactly:

{{
    "bmi": 0,
    "fitness_status": "",
    "daily_calories": 0,
    "workout_plan": ""
}}

No markdown.
No explanation.
Only JSON.
"""

    response = model.generate_content(
        prompt
    )

    text = response.text.strip()

    text = text.replace(
        "```json",
        ""
    )

    text = text.replace(
        "```",
        ""
    )

    return json.loads(
        text
    )


# =====================================
# AI COACH CHATBOT
# =====================================

def ask_ai(question):

    prompt = f"""
You are GymPro AI Coach.

Rules:

1. Maximum 80 words.
2. Use simple language.
3. No long paragraphs.
4. Give direct answer only.
5. Use emojis.
6. Format exactly:

🏋️ Answer:
(2-3 lines)

💪 Tips:
• Tip 1
• Tip 2
• Tip 3

Question:
{question}
"""

    response = model.generate_content(
        prompt
    )

    return response.text