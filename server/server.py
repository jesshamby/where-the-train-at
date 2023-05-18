from flask import Flask
from flask import request
from flask_cors import CORS
import methods

app = Flask(__name__)
CORS(app)

@app.route("/arrivals", methods=['GET'])
def arrivals():
    stop_point_id = request.args.get('stopPointId', '')
    platform_name = request.args.get('platformName')
    return methods.get_arrivals(stop_point_id, platform_name)

@app.route("/test", methods=['GET'])
def test():
    return request.args.get('testParam', 'DefaultValHere')

@app.route("/stops", methods=["GET"])
def stops():
    return methods.get_stops()

@app.route("/platforms", methods=["GET"])
def platforms():
    stop_point_id = request.args.get('stopPointId')
    return methods.get_platforms(stop_point_id)