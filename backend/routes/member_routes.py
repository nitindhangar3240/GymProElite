
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models.member_model import Member
from extensions import db
from datetime import datetime, timedelta

member_bp = Blueprint(
    "members",
    __name__
)

# PLAN DAYS

PLAN_DAYS = {
    "Trial": 7,
    "1 Month": 30,
    "2 Months": 60,
    "3 Months": 90,
    "6 Months": 180,
    "1 Year": 365
}

# CATEGORY PRICE

CATEGORY_PRICES = {
    "Silver": 1000,
    "Gold": 2000,
    "Platinum": 3500,
    "Premium": 5000
}


# ADD MEMBER
@member_bp.route("/add", methods=["POST"])
@jwt_required()
def add_member():

    try:

        data = request.get_json()

        membership_plan = data.get(
            "membership_plan"
        )

        membership_category = data.get(
            "membership_category"
        )

        # CUSTOM MEMBERSHIP

        if membership_plan == "Custom":

            start_date = data.get(
                "membership_start_date"
            )

            end_date = data.get(
                "membership_end_date"
            )

            if not start_date or not end_date:

                return jsonify({
                    "error": "Start Date and End Date are required for Custom Membership"
                }), 400

            join_date = datetime.strptime(
                start_date,
                "%Y-%m-%d"
            )

            expiry_date = datetime.strptime(
                end_date,
                "%Y-%m-%d"
            )

        else:

            join_date = datetime.utcnow()

            expiry_date = join_date + timedelta(
                days=PLAN_DAYS.get(
                    membership_plan,
                    30
                )
            )

        total_amount = CATEGORY_PRICES.get(
            membership_category,
            1000
        )

        height = float(
            data.get("height", 0)
        )

        weight = float(
            data.get("weight", 0)
        )

        goal = data.get(
            "goal",
            ""
        )
                # AI VALUES FROM FRONTEND

        bmi = float(
            data.get(
                "bmi",
                0
            )
        )

        ai_status = data.get(
            "fitness_status",
            "Normal"
        )

        calories = int(
            data.get(
                "daily_calories",
                2200
            )
        )

        workout = data.get(
            "workout_plan",
            "General Fitness"
        )

        member_status = "Active"

        new_member = Member(

            full_name=data.get("full_name"),

            email=data.get("email"),

            phone=data.get("phone"),

            age=data.get("age"),

            gender=data.get("gender"),

            membership_plan=membership_plan,

            membership_category=membership_category,

            total_amount=total_amount,

            height=height,

            weight=weight,

            goal=goal,

            bmi=bmi,

            fitness_status=ai_status,

            daily_calories=calories,

            workout_plan=workout,

            join_date=join_date,

            expiry_date=expiry_date,

            status=member_status

        )

        db.session.add(new_member)

        db.session.commit()

        return jsonify({
            "message": "Member Added Successfully"
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# GET MEMBERS

@member_bp.route("/", methods=["GET"])
@jwt_required()
def get_members():

    try:

        members = Member.query.order_by(
            Member.id.desc()
        ).all()

        return jsonify([
            member.to_dict()
            for member in members
        ]), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# UPDATE MEMBER

@member_bp.route("/update/<int:id>", methods=["PUT"])
@jwt_required()
def update_member(id):

    try:

        member = Member.query.get(id)

        if not member:

            return jsonify({
                "error": "Member not found"
            }), 404

        data = request.get_json()

        member.full_name = data.get(
            "full_name",
            member.full_name
        )

        

        member.phone = data.get(
            "phone",
            member.phone
        )

        member.goal = data.get(
            "goal",
            member.goal
        )

        member.membership_plan = data.get(
            "membership_plan",
            member.membership_plan
        )

        member.membership_category = data.get(
            "membership_category",
            member.membership_category
        )

        member.total_amount = CATEGORY_PRICES.get(
            member.membership_category,
            member.total_amount
        )

        member.expiry_date = datetime.utcnow() + timedelta(
            days=PLAN_DAYS.get(
                member.membership_plan,
                30
            )
        )

        db.session.commit()

        return jsonify({
            "message": "Member Updated Successfully"
        }), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# DELETE MEMBER

@member_bp.route("/delete/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_member(id):

    try:

        member = Member.query.get(id)

        if not member:

            return jsonify({
                "error": "Member not found"
            }), 404

        db.session.delete(member)

        db.session.commit()

        return jsonify({
            "message": "Member Deleted Successfully"
        }), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

## RENEW MEMBERSHIP

@member_bp.route("/renew/<int:id>", methods=["PUT"])
@jwt_required()
def renew_member(id):

    try:

        member = Member.query.get(id)

        if not member:

            return jsonify({
                "error": "Member not found"
            }), 404

        today_date = datetime.utcnow().date()

        days_left = (
            member.expiry_date.date() - today_date
        ).days

        # Allow renewal only in last 5 days
        if days_left > 5:

            return jsonify({
                "error": "Renewal allowed only within 5 days of expiry"
            }), 400

        days = PLAN_DAYS.get(
            member.membership_plan,
            30
        )

        current_time = datetime.utcnow()

        if (
            member.expiry_date
            and
            member.expiry_date > current_time
        ):

            member.expiry_date = (
                member.expiry_date +
                timedelta(days=days)
            )

        else:

            member.expiry_date = (
                current_time +
                timedelta(days=days)
            )

        member.status = "Active"

        member.total_amount += CATEGORY_PRICES.get(
            member.membership_category,
            0
        )

        db.session.commit()

        return jsonify({
            "message": "Membership Renewed Successfully"
        }), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500