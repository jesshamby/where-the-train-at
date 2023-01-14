from flask import Flask
import methods

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/sayhi")
def say_hi():
    return "<p>hi!</p>"