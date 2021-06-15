from flask import request
from flask_restful import Resource
from http import HTTPStatus
from flask import jsonify
from Models.User import User
from Schemas.User import UserSchema, user_schema
from marshmallow import ValidationError

class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return user_schema.dump(users)