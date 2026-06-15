from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from models.member_model import Member
from models.attendance_model import Attendance

from datetime import datetime, timedelta

dashboard_bp = Blueprint(
    "dashboard",
    __name__
)


@dashboard_bp.route("/", methods=["GET"])
@jwt_required()
def dashboard_stats():

    try:

        members = Member.query.all()

        today = datetime.now().date()

        # TOTAL MEMBERS

        total_members = len(
            members
        )

        # PREMIUM MEMBERS

        premium_members = len([

            member

            for member in members

            if member.membership_category == "Premium"

        ])

        # ACTIVE MEMBERS

        active_members = len([

            member

            for member in members

            if member.expiry_date
            and
            member.expiry_date.date() >= today

        ])

        # EXPIRING SOON COUNT

        expiring_soon = len([

            member

            for member in members

            if member.expiry_date

            and

            0 <= (

                member.expiry_date.date()
                -
                today

            ).days <= 7

        ])

        # EXPIRING MEMBERS LIST

        expiring_members = [

            {

                "name":
                    member.full_name,

                "days_left":

                    (
                        member.expiry_date.date()
                        -
                        today
                    ).days

            }

            for member in members

            if member.expiry_date

            and

            0 <= (

                member.expiry_date.date()
                -
                today

            ).days <= 7

        ]

        # EXPIRED MEMBERS COUNT

        expired_members = len([

            member

            for member in members

            if member.expiry_date

            and

            member.expiry_date.date() < today

        ])

        # EXPIRED MEMBERS LIST

        expired_member_list = [

            {

                "name":
                    member.full_name,

                "expired_days":

                    (
                        today
                        -
                        member.expiry_date.date()
                    ).days

            }

            for member in members

            if member.expiry_date

            and

            member.expiry_date.date() < today

        ]

        # TOTAL REVENUE

        total_revenue = sum([

            member.total_amount or 0

            for member in members

        ])

        # TODAY ATTENDANCE

        today_attendance = Attendance.query.filter_by(
            date=today
        ).count()

                # AI INSIGHTS

        valid_bmi_members = [

            member.bmi

            for member in members

            if member.bmi and member.bmi > 0

        ]

        average_bmi = round(

            sum(valid_bmi_members)

            /

            len(valid_bmi_members),

            1

        ) if valid_bmi_members else 0

        weight_gain_members = len([

            member

            for member in members

            if member.goal

            and "gain" in member.goal.lower()

        ])

        weight_loss_members = len([

            member

            for member in members

            if member.goal

            and (

                "loss" in member.goal.lower()

                or

                "lose" in member.goal.lower()

            )

        ])

        healthy_members = len([

            member

            for member in members

            if member.fitness_status

            and "healthy" in member.fitness_status.lower()

        ])

        underweight_members = len([

            member

            for member in members

            if member.fitness_status

            and "underweight" in member.fitness_status.lower()

        ])

        return jsonify({

            "total_members":
                total_members,

            "premium_members":
                premium_members,

            "active_members":
                active_members,

            "expiring_soon":
                expiring_soon,

            "expired_members":
                expired_members,

            "today_attendance":
                today_attendance,

            "total_revenue":
                total_revenue,

            "expiring_members":
                expiring_members,

            "expired_member_list":
    expired_member_list,

"average_bmi":
    average_bmi,

"weight_gain_members":
    weight_gain_members,

"weight_loss_members":
    weight_loss_members,

"healthy_members":
    healthy_members,

"underweight_members":
    underweight_members

        }), 200

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500
    
@dashboard_bp.route(
"/attendance-chart",
methods=["GET"]
)
@jwt_required()
def attendance_chart():

    try:

        today = datetime.now().date()

        chart_data = []

        for i in range(6, -1, -1):

            current_date = (
                today -
                timedelta(days=i)
            )

            attendance_count = Attendance.query.filter_by(
                date=current_date
            ).count()

            chart_data.append({

                "day":
                    current_date.strftime("%a"),

                "count":
                    attendance_count

            })

        return jsonify(
            chart_data
        ), 200

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500
    

@dashboard_bp.route(
    "/revenue-chart",
    methods=["GET"]
)
@jwt_required()
def revenue_chart():

    try:

        members = Member.query.all()

        revenue_data = []

        categories = [

            "Silver",
            "Gold",
            "Platinum",
            "Premium"

        ]

        for category in categories:

            total = sum(

                member.total_amount or 0

                for member in members

                if member.membership_category == category

            )

            revenue_data.append({

                "plan": category,

                "revenue": total

            })

            

        return jsonify(
            revenue_data
        ), 200

    except Exception as e:
        

        return jsonify({

            "error": str(e)

        }), 500
    
        