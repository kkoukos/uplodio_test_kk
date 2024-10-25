from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
app = Flask(__name__)

CORS(app)
# Example external API URL (replace with a real API endpoint)
api_url = "https://randomuser.me/api/"

@app.route('/user', methods=['GET'])
def get_data():
    
    gender = request.args.get('gender', default='', type=str).lower()   
    
    
    response = requests.get(api_url, params={'gender': gender})
   
    response.raise_for_status() 
     
    
    return jsonify(response.json()), response.status_code

  

if __name__ == '__main__':
    app.run()
