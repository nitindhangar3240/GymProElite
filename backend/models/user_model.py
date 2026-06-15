from extensions import db
from datetime import datetime

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)

    full_name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    password = db.Column(db.String(255), nullable=False)

    role = db.Column(db.String(20), nullable=False, default='member')

    phone = db.Column(db.String(20))

    membership_plan = db.Column(db.String(50))

    join_date = db.Column(db.DateTime, default=datetime.utcnow)

    is_active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "role": self.role,
            "phone": self.phone,
            "membership_plan": self.membership_plan,
            "is_active": self.is_active
        }

    def __repr__(self):
        return f"<User {self.email}>"