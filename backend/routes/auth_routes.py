from flask import Blueprint, request, jsonify

from flask_jwt_extended import create_access_token

from models.user_model import User
from extensions import db

import bcrypt

auth_bp = Blueprint('auth', __name__)


# REGISTER
@auth_bp.route('/register', methods=['POST'])
def register():

    data = request.get_json()

    existing_user = User.query.filter_by(
        email=data.get('email')
    ).first()

    if existing_user:

        return jsonify({
            "error": "Email already exists"
        }), 400

    hashed_password = bcrypt.hashpw(

        data.get('password').encode('utf-8'),

        bcrypt.gensalt()

    ).decode('utf-8')

    new_user = User(

        full_name=data.get('full_name'),

        email=data.get('email'),

        password=hashed_password,

        role=data.get('role', 'admin')

    )

    db.session.add(new_user)

    db.session.commit()

    return jsonify({

        "message": "User registered successfully"

    }), 201


# LOGIN
@auth_bp.route('/login', methods=['POST'])
def login():

    data = request.get_json()

    user = User.query.filter_by(
        email=data.get('email')
    ).first()

    if not user:

        return jsonify({
            "error": "Invalid email or password"
        }), 401

    password_match = bcrypt.checkpw(

        data.get('password').encode('utf-8'),

        user.password.encode('utf-8')

    )

    if not password_match:

        return jsonify({
            "error": "Invalid email or password"
        }), 401

    # IMPORTANT FIX
    access_token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({

        "message": "Login successful",

        "access_token": access_token,

        "user": {

            "id": user.id,

            "full_name": user.full_name,

            "email": user.email,

            "role": user.role

        }

    }), 200