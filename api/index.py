from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api/hello", methods=["GET"])
def hello_world():
    return jsonify(
        message="hello world",
        category="success",
        status=200,
    )


if __name__ == "__main__":
    app.run(port=5328)
