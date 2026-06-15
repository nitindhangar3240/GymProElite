from flask import Blueprint

from datetime import datetime

from models.member_model import Member

from services.email_service import (
    send_expiry_email
)

reminder_bp = Blueprint(
    "reminder",
    __name__
)


@reminder_bp.route(
    "/send-reminders",
    methods=["GET"]
)
def send_reminders():

    try:

        today = datetime.now().date()

        members = Member.query.all()

        emails_sent = 0

        print("\n========== MEMBERS CHECK ==========\n")

        for member in members:

            print(
                f"Member: {member.full_name}"
            )

            print(
                f"Email: {member.email}"
            )

            print(
                f"Expiry Date: {member.expiry_date}"
            )

            if not member.expiry_date:

                print(
                    "No expiry date found\n"
                )

                continue

            days_left = (

                member.expiry_date.date()
                -
                today

            ).days

            print(
                f"Days Left: {days_left}"
            )

            if 0 <= days_left <= 7:

                print(
                    "Sending Email..."
                )

                send_expiry_email(

                    member.full_name,

                    member.email,

                    days_left

                )

                emails_sent += 1

                print(
                    "Email Sent Successfully\n"
                )

            else:

                print(
                    "Not eligible for reminder\n"
                )

        print(
            f"\nTotal Emails Sent: {emails_sent}\n"
        )

        return {

            "success": True,

            "emails_sent": emails_sent

        }

    except Exception as e:

        print(
            "REMINDER ERROR:",
            str(e)
        )

        return {

            "success": False,

            "error": str(e)

        }, 500