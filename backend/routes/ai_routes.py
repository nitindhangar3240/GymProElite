from flask import Blueprint
from flask import request
from flask import jsonify

from services.ai_service import (
    generate_fitness_plan
)

ai_bp = Blueprint(
    "ai",
    __name__
)


@ai_bp.route(
    "/generate-plan",
    methods=["POST"]
)
def generate_plan():

    try:

        data = request.get_json()

        result = generate_fitness_plan(

            data.get("age"),

            data.get("height"),

            data.get("weight"),

            data.get("goal")

        )

        return jsonify(
            result
        ), 200

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500