from flask import request
from flask_restful import Resource
from http import HTTPStatus
from flask import jsonify
from Models.Models import Forms
from Schemas.Form import FormSchema, form_schema, forms_schema
from marshmallow import ValidationError
from extensions import db
import boto3
import os

class FormListResource(Resource):
    def get(self):
        #Get all forms WITH Marshmallow
        forms = Forms.query.all()

        #Download photo from AWS Bucket 
        #s3 = boto3.client('s3')
        #s3.download_file('rn-mobile-app-bucket', 'Uploaded Photos/NicolBolas.jpg', 'C:/Users/e096752/Downloads/bolas.jpg')
        
        """
            Download all files in a bucket
            Args:
                bucket_name: the name of the s3 bucket
                s3_folder: the folder path in the s3 bucket
                local_dir: a relative or absolute directory path in the local file system
        """
        """s3 = boto3.resource('s3')
        def download_s3_folder(bucket_name, s3_folder, local_dir):
            bucket = s3.Bucket(bucket_name)
            for obj in bucket.objects.filter(Prefix=s3_folder):
                target = obj.key if local_dir is None \
                    else os.path.join(local_dir, os.path.relpath(obj.key, s3_folder))
                if not os.path.exists(os.path.dirname(target)):
                    os.makedirs(os.path.dirname(target))
                if obj.key[-1] == '/':
                    continue
                bucket.download_file(obj.key, target)
        download_s3_folder('rn-mobile-app-bucket', 'Uploaded Photos', 'C:/Users/e096752/Downloads') """
        return forms_schema.dump(forms) #use forms_schema (plural) because we are getting all forms (multiple).

        #This is the approach WITHOUT Marshmallow
        # users = User.query.all()
        # data = jsonify(convert_sqlobj_json(users))
        # return data
    
    def post(self):
        json_data = request.get_json()

        #Create a new Form using Marshmallow
        new_form = Forms(
            Name=request.json['Name'],
            Phone=request.json['Phone'],
            Email=request.json['Email'],
            County=request.json['County'],
            RoadName=request.json['RoadName'],
            MileMarker=request.json['MileMarker'],
            Comments=request.json['Comments'],
            Path=request.json['Path']
        )
        db.session.add(new_form)
        db.session.commit()

        s3 = boto3.client('s3')
        s3.upload_file('C:/Users/e096752/Downloads/pothole1.jpg', 'rn-mobile-app-bucket', 'Uploaded Photos/test8978.png') #this does not work. The path variable isnt accepted

        return form_schema.dump(new_form)

    def delete(self):
        json_data = request.get_json()

        #Delete a user
        data = request.get_json()
        formID = request.json['ID']
        print(formID)
        form = Forms.query.get_or_404(formID)
        db.session.delete(form)
        db.session.commit()
        return 'Its done.', 204

class FormResource(Resource):
    #Get a user by ID
    def post(self):
        json_data = request.get_json()
        formID = request.json['ID']
        form = Forms.query.get_or_404(formID)
        return form_schema.dump(form)

    def patch(self):
        json_data = request.get_json()
        data = request.get_json()
        formID = request.json['ID']
        form = Forms.query.get_or_404(formID)

        if 'Name' in request.json:
            form.Name = request.json['Name']
        if 'Age' in request.json:
            form.Age = request.json['Age']

        db.session.commit()
        return form_schema.dump(form)