from marshmallow import Schema, fields
from models.Users import User
from main import ma

class UserSchema(ma.Schema):
    class Meta:
        fields = ("ID", "Name", "Age")
        model = User
        
user_schema = UserSchema()
users_schema = UserSchema(many=True)