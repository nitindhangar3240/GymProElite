from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from extensions import db

# ROUTES
from routes.auth_routes import auth_bp
from routes.member_routes import member_bp
from routes.dashboard_routes import dashboard_bp
from routes.attendance_routes import attendance_bp
from routes.ai_routes import ai_bp

from routes.report_routes import report_bp
from routes.reminder_routes import reminder_bp
from routes.chatbot_routes import chatbot_bp
# APP
app = Flask(__name__)

# CONFIG
app.config.from_object(Config)

# DATABASE
db.init_app(app)

# CORS
CORS(app)

# JWT
jwt = JWTManager(app)

# ROUTES
app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

app.register_blueprint(
    member_bp,
    url_prefix="/api/members"
)

app.register_blueprint(
    dashboard_bp,
    url_prefix="/api/dashboard"
)

app.register_blueprint(
    attendance_bp,
    url_prefix="/api/attendance"
)

app.register_blueprint(
    ai_bp,
    url_prefix="/api/ai"
)

app.register_blueprint(
    chatbot_bp,
    url_prefix="/api/chatbot"
)

app.register_blueprint(
    report_bp,
    url_prefix="/api/report"
)

app.register_blueprint(
    reminder_bp,
    url_prefix="/api/reminder"
)

# MODELS
from models.user_model import User
from models.member_model import Member
from models.attendance_model import Attendance

# HOME
@app.route("/")
def home():

    return {
        "message": "Gym Management Backend Running Successfully"
    }


# JWT TEST
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

@app.route("/test-jwt")
@jwt_required()
def test_jwt():

    return {
        "user": get_jwt_identity()
    }


# CREATE TABLES
with app.app_context():

    db.create_all()

    print(
        "Database tables created successfully!"
    )


# RUN
if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )