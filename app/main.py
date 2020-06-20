# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_cloudsql_mysql]
import os
from flask import jsonify
from typing import *

from flask import Flask, request
from flask_cors import CORS
import pymysql

db_user = os.environ.get('CLOUD_SQL_USERNAME')
db_password = os.environ.get('CLOUD_SQL_PASSWORD')
db_name = os.environ.get('CLOUD_SQL_DATABASE_NAME')
db_connection_name = os.environ.get('CLOUD_SQL_CONNECTION_NAME')

app = Flask(__name__)
CORS(app)

# sql = sql query as string
def query(sql : str, data : List[str] = []) -> List[List[str]]:
    result = None
    try:
        # When deployed to App Engine, the `GAE_ENV` environment variable will be
        # set to `standard`
        if os.environ.get('GAE_ENV') == 'standard':
            # If deployed, use the local socket interface for accessing Cloud SQL
            unix_socket = '/cloudsql/{}'.format(db_connection_name)
            connection = pymysql.connect(user=db_user, password=db_password, unix_socket=unix_socket, db=db_name)

        else:
            # If running locally, use the TCP connections instead
            # Set up Cloud SQL Proxy (cloud.google.com/sql/docs/mysql/sql-proxy)
            # so that your application can use 127.0.0.1:3306 to connect to your
            # Cloud SQL instance
            host = '127.0.0.1'
            connection = pymysql.connect(user='root', password='cs348', host=host, db='db_1')

        with connection.cursor(pymysql.cursors.DictCursor) as cursor:
            # Create a new record
            cursor.execute(sql, data)
            result = cursor.fetchall()

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()

    finally:
        connection.close()

    return result


@app.route("/api/recipes", methods=["GET"])
def recipes():
    result = query("SELECT * FROM recipe")
    return jsonify(result)

@app.route("/api/ingredients/<int:id>", methods=["GET"])
def ingredients(id):
    with open("../sql_scripts/ingredientsQuery.sql") as file:
        queryText = file.read()
    result = query(queryText, id)
    return jsonify(result)

@app.route("/api/tags/<int:id>", methods=["GET"])
def tags(id):
    with open("../sql_scripts/tagsQuery.sql") as file:
        queryText = file.read()
    result = query(queryText, id)
    return jsonify(result)


@app.route("/api/search", methods=["POST"])
def search():
    args = request.json
    if ("recipeName" in args):
        with open("../sql_scripts/recipeNameQuery.sql") as file:
            queryText = file.read()
        params = args["recipeName"]
        result = query(queryText, params)
        return jsonify(result)
    elif ("ingredients" in args):
        with open("../sql_scripts/recipeByIngredientsQuery.sql") as file:
            queryText = file.read()
        params = "|".join(args["ingredients"])
        result = query(queryText, params)
        return jsonify(result)
    elif ("tags" in args):
        with open("../sql_scripts/recipeByTagQuery.sql") as file:
            queryText = file.read()
        params = "|".join(args["tags"])
        result = query(queryText, params)
        return jsonify(result)
    else:
        return jsonify({"error": "Invalid argument key provided."})

@app.route("/", methods=["GET"])
def get_root_handler():
    return """<a href="/api/recipes">Get recipes</a>"""

# [END gae_python37_cloudsql_mysql]


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
