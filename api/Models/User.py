from main import db

class User(db.Model):
    __tablename__ = 'Users'
    ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(50))
    Age = db.Column(db.Integer)

    def __repr__(self):
        return '<User %s>' % self.Name

