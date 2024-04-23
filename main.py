from flask import Flask, jsonify, render_template, request, make_response, url_for
import werkzeug
import json
import httpx
import datetime

app = Flask(__name__)

def sortitems(elem):
    return elem['playerName']

@app.route("/")
async def index():
    siteColor = request.cookies.get("sitecolor")
    async with httpx.AsyncClient() as client:
        server_id = "q8538p"
        if "sserver" in request.args:
            server_id = request.args.get("sserver")
        
        res = await client.get(f'https://servers-frontend.fivem.net/api/servers/single/{server_id}')
        data = res.json()
        plrs = [{"playerName": player["name"], "id": player["id"], "license": player["identifiers"][0]} for player in data["Data"]["players"]]
        plrs = sorted(plrs, key=sortitems)
        
        return render_template("index.html", players = plrs, siteColor = siteColor if siteColor else "light")

@app.route("/setcookie", methods=["POST"])
async def setcookie():
    resp = make_response()
    resp.set_cookie("sitecolor", request.headers["selectedColors"], expires=datetime.date(2025, 4, 23))
    return resp

@app.errorhandler(werkzeug.exceptions.BadRequest)
def handle_bad_request(e):
    pass

app.run("0.0.0.0", 80, True, True)