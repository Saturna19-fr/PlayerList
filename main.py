from flask import Flask, jsonify, render_template, request
import werkzeug
import json
import httpx

app = Flask(__name__)

def sortitems(elem):
    return elem['playerName']

@app.route("/")
async def index():
    async with httpx.AsyncClient() as client:
        server_id = "q8538p"
        if "sserver" in request.args:
            server_id = request.args.get("sserver")
        
        res = await client.get(f'https://servers-frontend.fivem.net/api/servers/single/{server_id}')
        data = res.json()
        plrs = [{"playerName": player["name"], "id": player["id"], "license": player["identifiers"][0]} for player in data["Data"]["players"]]
        plrs = sorted(plrs, key=sortitems)
        
        return render_template("index.html", players = plrs)

@app.errorhandler(werkzeug.exceptions.BadRequest)
def handle_bad_request(e):
    pass

app.run("0.0.0.0", 80, True, True)