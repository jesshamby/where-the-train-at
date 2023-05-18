import requests
import json
import os

from jsonpath_ng.jsonpath import Fields, Slice
from jsonpath_ng.ext import parse
from constants import base_url, app_key

# Call a given endpoint with the appropriate query parameters
def call_endpoint (endpoint, query_params):
        formatted = r"{base_url}{endpoint}".format(base_url = base_url, endpoint = endpoint)
        response = requests.get(formatted, params= query_params.update({"app_key": app_key}))
        return {"body": response.json(), "status_code": response.status_code}

# Split list into chunks
def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

# Get arrivals for a given StopPoint ID
def get_arrivals(stop_point_id, platform_name):
    endpoint = "/StopPoint/{stop_point_id}/arrivals".format(stop_point_id = stop_point_id)
    body = call_endpoint(endpoint, {})["body"]

    query_string = "$[?(@.platformName == '{platform_name}')].['timeToStation', 'towards']".format(platform_name=platform_name)
    # query_string = "$[*].['timeToStation', 'towards']"
    expression = parse(query_string)
    match = expression.find(body)
    
    match = [x.value for x in match]
    mapped = chunks(match, 2)
    mapped = map(lambda x: {"timeToStation": -(x[0] // -60), "towards": x[1]}, mapped)

    time_sorted = sorted(list(mapped), key= lambda d: d['timeToStation'])
    output = json.dumps(time_sorted)
    return output

# Return list of stops as JSON
def get_stops():
    with open("../data/stops.json", "r") as f:
       return json.loads(f.read()) 

# Get platforms for a given StopPoint
def get_platforms(stop_point_id):
    endpoint = "/StopPoint/{stop_point_id}/arrivals".format(stop_point_id = stop_point_id)
    response = call_endpoint(endpoint, {})
    body = response["body"]
    statusCode = response["status_code"]
    
    query_string = "$[*].platformName"
    expression = parse(query_string)
    match = expression.find(body)
    match = [x.value for x in match]
    match = list(set(match))
    return json.dumps(match)