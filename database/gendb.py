# Imports
import pandas as pd
from pymongo import MongoClient
# Load csv dataset
data = pd.read_json("../.secrets/students.json")
# Connect to MongoDB
client =  MongoClient("<>")
db = client['students']
collection = db['ug']
years = ['15','16','17','18','19','20']
df = pd.DataFrame(columns=['username','name','clearance','rollno','banned'])
ugdb = data[(data.i.str.startswith(tuple(years))) & (data.i.str.len() == 6)]
df['username'] =ugdb['u']
df['name'] = ugdb['n']
df['rollno'] = ugdb['i']
df['clearance'] = 1
df['banned'] = False
df.reset_index(inplace=True)
data_dict = df.to_dict("records")
# Insert collection
collection.insert_many(data_dict)