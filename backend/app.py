from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS 
from bson.objectid import ObjectId


app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
client = MongoClient("mongodb://localhost:27017/")
db = client["mobileapp"]
users = db["users"]

# Register new user
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    existing_user = users.find_one({"email": data['email']})
    if existing_user:
        return jsonify({"message": "User already exists!"}), 409
    hashed_password = generate_password_hash(data['password'])   
    new_user = {
        "name":data['name'],
        "email": data['email'],
        "password": hashed_password,
    }    
    users.insert_one(new_user)
    return jsonify({"message": "User registered successfully!"}), 201

# Login user
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()    
    user = users.find_one({"email": data['email']})    
    if not user or not check_password_hash(user['password'], data['password']):        
        return jsonify({"message": "Invalid credentials!"}), 401
    return jsonify({"message": "Login successful!"}), 200


@app.route('/user/<email>', methods=['GET'])
def get_user_by_email(email):
    try:
        user = users.find_one({"email": email})          
        if user:
            user['_id'] = str(user['_id'])  
            return jsonify(user), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"message": f"Error fetching user: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

