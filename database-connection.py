from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
import certifi


uri = "mongodb+srv://abelardosobarzo14:bLH9zCMExAb9EmzV@course-clarity-0.cqrri.mongodb.net/?retryWrites=true&w=majority&appName=course-clarity-0"


with open('./data/courses.json') as f:
    data = json.load(f)

client = MongoClient(uri, tlsCAFile=certifi.where(), server_api=ServerApi('1'))

try:
    database = client.get_database("course_syllabi")
    collection = database.get_collection("syllabi")
    collection.insert_one(data)
    

    client.close()




except Exception as e:
    raise Exception("Unable to find the document due to the following error: ", e)


