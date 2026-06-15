from extensions import db
from datetime import datetime


class Member(db.Model):

    __tablename__ = "members"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    full_name = db.Column(
        db.String(200),
        nullable=False
    )

    email = db.Column(
        db.String(200),
        unique=True,
        nullable=False
    )

    phone = db.Column(
        db.String(20)
    )

    age = db.Column(
        db.Integer
    )

    gender = db.Column(
        db.String(20)
    )

    membership_plan = db.Column(
        db.String(100)
    )

    membership_category = db.Column(
        db.String(100)
    )

    total_amount = db.Column(
        db.Integer,
        default=0
    )

    height = db.Column(
        db.Float
    )

    weight = db.Column(
        db.Float
    )

    goal = db.Column(
        db.String(200)
    )

    bmi = db.Column(
        db.Float,
        default=0
    )

    fitness_status = db.Column(
        db.String(100)
    )

    daily_calories = db.Column(
        db.Integer,
        default=0
    )

    workout_plan = db.Column(
        db.String(200)
    )

    join_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    expiry_date = db.Column(
        db.DateTime
    )

    status = db.Column(
        db.String(50),
        default="Active"
    )

    def to_dict(self):

        days_remaining = 0

        if self.expiry_date:

            days_remaining = (
                self.expiry_date.date()
                -
                datetime.utcnow().date()
            ).days

        membership_status = "Active"

        if days_remaining < 0:

            membership_status = "Expired"

        elif days_remaining <= 7:

            membership_status = "Expiring Soon"

        return {

            "id": self.id,

            "full_name": self.full_name,

            "email": self.email,

            "phone": self.phone,

            "age": self.age,

            "gender": self.gender,

            "membership_plan": self.membership_plan,

            "membership_category": self.membership_category,

            "total_amount": self.total_amount,

            "height": self.height,

            "weight": self.weight,

            "goal": self.goal,

            "bmi": self.bmi,

            "fitness_status": self.fitness_status,

            "daily_calories": self.daily_calories,

            "workout_plan": self.workout_plan,

            "join_date":
                self.join_date.strftime("%Y-%m-%d")
                if self.join_date else "",

            "expiry_date":
                self.expiry_date.strftime("%Y-%m-%d")
                if self.expiry_date else "",

            "days_remaining":
                days_remaining,

            "membership_status":
                membership_status,

            "status":
                self.status

        }