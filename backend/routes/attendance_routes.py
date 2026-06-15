from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models.attendance_model import Attendance

from datetime import datetime, timedelta

attendance_bp = Blueprint(
    "attendance",
    __name__
)


def indian_now():

    return datetime.utcnow() + timedelta(
        hours=5,
        minutes=30
    )


# CHECK IN

@attendance_bp.route("/checkin", methods=["POST"])
@jwt_required()
def checkin():

    try:

        data = request.get_json()

        today = indian_now().date()

        member_id = data.get(
            "member_id"
        )

        existing = Attendance.query.filter(
            Attendance.member_id == member_id,
            Attendance.date == today
        ).first()

        if existing:

            return jsonify({
                "error": "Attendance already marked today"
            }), 400

        attendance = Attendance(

            member_id=member_id,

            member_name=data.get(
                "member_name"
            ),

            date=today,

            check_in_time=indian_now(),

            status="Present"

        )

        db.session.add(attendance)
        db.session.commit()

        return jsonify({
            "message": "Attendance Marked Successfully"
        }), 201

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# CHECK OUT

@attendance_bp.route(
    "/checkout/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def checkout(id):

    try:

        attendance = Attendance.query.get(id)

        if not attendance:

            return jsonify({
                "error": "Attendance record not found"
            }), 404

        if attendance.check_out_time:

            return jsonify({
                "error": "Already checked out"
            }), 400

        attendance.check_out_time = indian_now()

        attendance.status = "Completed"

        db.session.commit()

        return jsonify({
            "message": "Checkout Successful"
        }), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# TODAY ATTENDANCE

@attendance_bp.route(
    "/today",
    methods=["GET"]
)
@jwt_required()
def today_attendance():

    try:

        today = indian_now().date()

        records = Attendance.query.filter_by(
            date=today
        ).all()

        return jsonify([
            record.to_dict()
            for record in records
        ]), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ALL ATTENDANCE

@attendance_bp.route(
    "/",
    methods=["GET"]
)
@jwt_required()
def all_attendance():

    try:

        records = Attendance.query.order_by(
            Attendance.id.desc()
        ).all()

        return jsonify([
            record.to_dict()
            for record in records
        ]), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500