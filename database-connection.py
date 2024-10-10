from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi


uri = "mongodb+srv://abelardosobarzo14:bLH9zCMExAb9EmzV@course-clarity-0.cqrri.mongodb.net/?retryWrites=true&w=majority&appName=course-clarity-0"


client = MongoClient(uri, tlsCAFile=certifi.where(), server_api=ServerApi('1'))

try:
    database = client.get_database("sample_mflix")
    movies = database.get_collection("movies")
    # Query for a movie that has the title 'Back to the Future'
    query = { "title": "Back to the Future" }
    movie = movies.find_one(query)
    print(movie)
    client.close()
except Exception as e:
    raise Exception("Unable to find the document due to the following error: ", e)
