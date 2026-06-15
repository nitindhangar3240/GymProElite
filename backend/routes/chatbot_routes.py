from flask import Blueprint, request, jsonify

from services.ai_service import ask_ai

chatbot_bp = Blueprint(
    "chatbot",
    __name__
)

@chatbot_bp.route(
    "/chat",
    methods=["POST"]
)
def chat():

    try:

        data = request.get_json()

        question = data.get(
            "message"
        )

        answer = ask_ai(
            question
        )

        return jsonify({

            "reply": answer

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500