from extensions import db
from datetime import datetime


class Attendance(db.Model):

    __tablename__ = "attendance"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    member_id = db.Column(
        db.Integer,
        nullable=False
    )

    member_name = db.Column(
        db.String(200),
        nullable=False
    )

    date = db.Column(
        db.Date,
        nullable=False
    )

    check_in_time = db.Column(
        db.DateTime,
        default=datetime.now
    )

    check_out_time = db.Column(
        db.DateTime,
        nullable=True
    )

    status = db.Column(
        db.String(50),
        default="Present"
    )

    def to_dict(self):

        return {

            "id": self.id,

            "member_id": self.member_id,

            "member_name": self.member_name,

            "date": self.date.strftime("%Y-%m-%d")
            if self.date else "",

            "check_in_time": self.check_in_time.strftime("%H:%M:%S")
            if self.check_in_time else "",

            "check_out_time": self.check_out_time.strftime("%H:%M:%S")
            if self.check_out_time else "",

            "status": self.status

        }