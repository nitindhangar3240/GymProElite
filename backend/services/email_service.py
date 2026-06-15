import smtplib

from email.mime.text import MIMEText

from email.mime.multipart import MIMEMultipart


def send_expiry_email(
    member_name,
    member_email,
    days_left
):

    sender_email = "dhangarnitin3240@gmail.com"

    app_password = "import os"

    subject = "GymPro Elite Membership Renewal Reminder"

    body = f"""
Hello {member_name},

Your membership will expire in {days_left} day(s).

Please renew your membership.

Thank you,
GymPro Elite Team
"""

    msg = MIMEMultipart()

    msg["From"] = sender_email
    msg["To"] = member_email
    msg["Subject"] = subject

    msg.attach(
        MIMEText(
            body,
            "plain"
        )
    )

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        sender_email,
        app_password
    )

    server.send_message(msg)

    server.quit()