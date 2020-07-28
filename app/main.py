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

from flask import Flask, request, make_response
from flask_cors import CORS
import pymysql

db_user = os.environ.get('CLOUD_SQL_USERNAME')
db_password = os.environ.get('CLOUD_SQL_PASSWORD')
db_name = os.environ.get('CLOUD_SQL_DATABASE_NAME')
db_connection_name = os.environ.get('CLOUD_SQL_CONNECTION_NAME')

app = Flask(__name__)
CORS(app)

# sql = sql query as string
def query(sql : str, data : List[str] = [], multi: bool = False) -> List[List[str]]:
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

        if(multi):
            queries = sql.split(";")
            for x in range(len(queries)-1):
                with connection.cursor(pymysql.cursors.DictCursor) as cursor:
                    cursor.execute(queries[x], data[x] if (x < len(data)) else None)
                    result = cursor.fetchall()

        else:
            with connection.cursor(pymysql.cursors.DictCursor) as cursor:
                # Execute the query
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
    with open("sql_scripts/search/recipeAll.sql") as file:
        queryText = file.read()
    result = query(queryText)
    return jsonify(result)

@app.route("/api/ingredients/<int:id>", methods=["GET"])
def ingredients(id):
    with open("sql_scripts/recipeDetails/ingredientsQuery.sql") as file:
        queryText = file.read()
    result = query(queryText, id)
    return jsonify(result)

@app.route("/api/tags/<int:id>", methods=["GET"])
def tags(id):
    with open("sql_scripts/recipeDetails/tagsQuery.sql") as file:
        queryText = file.read()
    result = query(queryText, id)
    return jsonify(result)

@app.route("/api/substitutions/<int:id>", methods=["GET"])
def substitutions(id):
    with open("sql_scripts/recipeDetails/substitutionsQuery.sql") as file:
        queryText = file.read()
    result = query(queryText, id)
    return jsonify(result)

@app.route("/api/reactCount/<int:id>", methods=["GET"])
def reactCount(id):
    with open("sql_scripts/recipeDetails/reactCountQuery.sql") as file:
        queryText = file.read()
    result = query(queryText, id)
    return jsonify(result)

@app.route("/api/mood/userId=<int:userId>&recipeId=<int:recipeId>", methods=["GET"])
def mood(userId, recipeId):
    with open("sql_scripts/user/moodQuery.sql") as file:
        queryText = file.read()
    result = query(queryText, [userId, recipeId])
    return jsonify(result)

@app.route("/api/favourites/userId=<int:userId>&mood=<int:mood>", methods=["GET"])
def favourites(userId, mood):
    with open("sql_scripts/user/favouritesQuery.sql") as file:
        queryText = file.read()
    result = query(queryText, [userId, mood])
    return jsonify(result)

@app.route("/api/login", methods=["POST"])
def login():
    args = request.json
    username = args["username"] if "username" in args else ""
    password = args["password"] if "password" in args else ""
    result = {}

    with open("sql_scripts/user/signInQuery.sql") as file:
        result = query(file.read(), [username, password])
        if(type(result) == tuple):
            result = {}
            result["error"] = "The username or password is incorrect"
            return make_response(jsonify(result), 401)

    return make_response(jsonify(result[0]), 200)

@app.route("/api/register", methods=["POST"])
def register():
    args = request.json
    username = args["username"] if "username" in args else ""
    password = args["password"] if "password" in args else ""
    result = {}

    if (username == "" or password == ""):
        result["error"] = "Invalid request, cannot have empty parameters"
        return make_response(jsonify(result), 400)

    with open("sql_scripts/user/insertUser.sql") as file:
        try:
            result = query(file.read(), [username, password])
        except pymysql.err.IntegrityError:
            result["error"] = "The username " + username + " is already in use. Please choose a new one."
            return make_response(jsonify(result), 400)

    with open("sql_scripts/user/getUserIdQuery.sql") as file:
        result = query(file.read(), username)[0]

    return make_response(jsonify(result), 200)

@app.route("/api/react", methods=["POST"])
def addReact():
    args = request.json
    userId = args["userId"] if "userId" in args else ""
    recipeId = args["recipeId"] if "recipeId" in args else ""
    mood = args["mood"] if "mood" in args else ""
    result = {}

    if (userId == "" or recipeId == "" or mood == ""):
        result["error"] = "Invalid request, missing a parameter"
        return make_response(jsonify(result), 400)

    with open("sql_scripts/user/insertReact.sql") as file:
        try:
            query(file.read(), [userId, recipeId, mood])
            result["msg"] = "Successful insertion"
        except pymysql.err.IntegrityError:
            result["error"] = "Insert failed. Either userId or recipeId is invalid."
            return make_response(jsonify(result), 400)

    return make_response(jsonify(result), 200)

@app.route("/api/react", methods=["DELETE"])
def deleteReact():
    args = request.json
    userId = args["userId"] if "userId" in args else ""
    recipeId = args["recipeId"] if "recipeId" in args else ""
    result = {}

    if (userId == "" or recipeId == ""):
        result["error"] = "Invalid request, missing a parameter"
        return make_response(jsonify(result), 400)

    with open("sql_scripts/user/deleteReact.sql") as file:
        query(file.read(), [userId, recipeId])
        result["msg"] = "Successful deletion"

    return make_response(jsonify(result), 200)

@app.route("/api/newRecipe", methods=["POST"])
def addRecipe():
    args = request.json
    result = {}

    fields_for_recipe = ["recipeName", "servings", "cookTime", "difficulty", "cuisine", "imageURL", "instructionsLink", "authorName"]
    fields_for_ingredient = ["foodName","quantity","unit"]
    fields_for_substitutes = ["foodName","substituteName"]

    # check that there data for each table
    if "recipe" not in args or "ingredient" not in args or "tags" not in args:
        result["error"] = "Missing recipe/ingredient/tags information."
        return make_response(jsonify(result), 400)

    # check not null fields
    if "recipeName" not in args["recipe"]: 
        result["error"] = "New recipe must have recipeName."
        return make_response(jsonify(result), 400)
    if "servings" not in args["recipe"]:
        result["error"] = "New recipe must have servings."
        return make_response(jsonify(result), 400)

    # set recipe fields
    values_for_recipe = [None, None, None, None, None, None, None, None]
    for i,f in enumerate(fields_for_recipe):
        if f in args["recipe"]:
            values_for_recipe[i] = args["recipe"][f]

    ingredients = []
    substitutes = []
    for ing in args["ingredient"]:
        # if there is no ingredient name, skip to next ingredient
        if "foodName" not in ing:
            continue

        ingredient = [None, None, None]
        # check if ingredient has substitutes
        if "substitutes" in ing:
            for s in ing["substitutes"]:
                substitutes.append([ing["foodName"],s])

        # set ingredient fields
        for i,f in enumerate(fields_for_ingredient):
            if f in ing:
                ingredient[i] = ing[f]
        ingredients.append(ingredient)

    # set tags
    tags = args["tags"]
        
    queries = []
    params = []
    # insert recipe into recipe table
    with open("sql_scripts/newRecipe/insertRecipeQuery.sql") as file:
        queries.append(file.read())
        params.append(values_for_recipe)
    params.append([])
    if len(ingredients) > 0:
        with open("sql_scripts/newRecipe/insertIngredientQuery.sql") as file:
            q = file.read()
            p = []
            for i in range(len(ingredients)):
                q += "(@last_recipe_id, %s, %s, %s),"
                p.extend(ingredients[i])
            # remove last comma and add semi-colon
            q = q[:-1]
            q += ";"
            queries.append(q)
            params.append(p)
    
    if len(substitutes) > 0:
        with open("sql_scripts/newRecipe/insertSubstitutesQuery.sql") as file:
            q = file.read()
            p = []
            for i in range(len(substitutes)):
                q += "(@last_recipe_id, %s, %s),"
                p.extend(substitutes[i])
            q = q[:-1]
            q += ";"
            queries.append(q)
            params.append(p)
    
    if len(tags) > 0:
        with open("sql_scripts/newRecipe/insertTagsQuery.sql") as file:
            q = file.read()
            p = tags
            for i in range(len(tags)):
                q += "(@last_recipe_id, %s),"
            q = q[:-1]
            q += ";"
            queries.append(q)
            params.append(p)
    try:
        query(" ".join(queries), params, multi=True)
    except Exception as e:
        # some error when executing the query
        result["error"] = "Error when inserting new recipe into the database."
        return make_response(jsonify(result), 400)

    return make_response(jsonify(result), 200)
            
    
@app.route("/api/search", methods=["POST"])
def search():
    args = request.json
    recipe_dict = {}
    recipeName = args["recipeName"] if "recipeName" in args else ""
    ingredients = args["ingredients"] if "ingredients" in args else []
    tags = args["tags"] if "tags" in args else []
    orderBy = args["orderBy"] if "orderBy" in args else 0
    isAsc = args["isAsc"] if "isAsc" in args else 1
    isStrict = args["isStrict"] if "isStrict" in args else False
    isSubs = args["isSubs"] if "isSubs" in args else False
    exclude = args["exclude"] if "exclude" in args else []
    result = {}

    # if sorting by missing ingredients but no ingredients supplied, switch to recipeId sort
    if (orderBy == 3 and (len(ingredients) == 0 or isStrict)):
        orderBy = 0

    def getSort(orderBy, isAsc):
        orderByMap = ["recipeId", "difficulty", "cookTime", "1 - IFNULL(count,0)/total"]
        sortOrder = ["DESC", "ASC"]
        return " ORDER BY " + orderByMap[orderBy] + " " + sortOrder[isAsc] + ";"

    # use recipe_dict to keep track of recipes from query results
    # add a score field to keep track of relevant recipes
    def addToDict(res: dict) -> None:
        for r in res:
            if "recipeId" in r:
                if r["recipeId"] in recipe_dict:
                    recipe_dict[r["recipeId"]]["score"] += 1
                else:
                    recipe_dict[r["recipeId"]] = r
                    recipe_dict[r["recipeId"]]["score"] = 1

    if(isStrict):
        queries = []
        paramList = [recipeName, "|".join(ingredients), "|".join(exclude), "|".join(tags)]

        if(recipeName == "" and len(ingredients) == 0 and len(tags) == 0):
            with open("sql_scripts/search/recipeAll.sql") as file:
                queryText = file.read()
            queries.append(queryText)

        # Only make query if recipeName is not empty
        if (recipeName != ""):
            with open("sql_scripts/search/recipeByNameQueryStrict.sql") as file:
                queryText = file.read()
            queries.append(queryText)
        
        if (len(ingredients) > 0 and len(exclude) > 0):
            if(not isSubs):
                # Add strict ingredient query
                with open("sql_scripts/search/recipeByIngredientsQueryStrict.sql") as file:
                    queryText = file.read()
                queries.append(queryText)

                # Add exclude ingredient query
                with open("sql_scripts/search/recipeExcludeIngredientsStrict.sql") as file:
                    queryText = file.read()
                queries.append(queryText)
            else:
                # Add exclude ingredient with subs query
                with open("sql_scripts/search/recipeExcludeWithSubsStrict.sql") as file:
                    queryText = file.read()
                queries.append(queryText)
        elif (len(ingredients) > 0):
            # Choose correct file depending on if subs is enabled
            fileName = "sql_scripts/search/recipeWithSubsQueryStrict.sql" if isSubs else "sql_scripts/search/recipeByIngredientsQueryStrict.sql"
            with open(fileName) as file:
                queryText = file.read()
            queries.append(queryText)
        elif (len(exclude) > 0):
            # Add exclusion ingredient query
            with open("sql_scripts/search/recipeExcludeIngredientsStrict.sql") as file:
                queryText = file.read()
            queries.append(queryText)
            
        # Only make query if tags are not empty
        if (len(tags) > 0):
            with open("sql_scripts/search/recipeByTagQueryStrict.sql") as file:
                queryText = file.read()
            queries.append(queryText)
        
        # First set all parameters
        sqlQuery = "SET @name := %s;\nSET @params := %s;\nSET @exclude := %s;\nSET @tags := %s;\n"
        # Then piece together all the queries and add the order by
        sqlQuery += "SELECT * FROM recipe WHERE recipeId IN (\n" + "\n) AND recipeId IN (\n".join(queries) + "\n)" + getSort(orderBy, isAsc)
        
        result["recipes"] = query(sqlQuery, paramList, True)

    else:
        if(recipeName == "" and len(ingredients) == 0 and len(tags) == 0):
            with open("sql_scripts/search/recipeAll.sql") as file:
                queryText = file.read()
            addToDict(query(queryText + getSort(orderBy, isAsc)))

        # Only make query if recipeName is not empty
        if (recipeName != ""):
            with open("sql_scripts/search/recipeByNameQuery" + ("Missing" if (orderBy == 3) else "") + ".sql") as file:
                queryText = file.read()
            params = [recipeName, "|".join(ingredients)] if orderBy == 3 else recipeName
            addToDict(query(queryText + getSort(orderBy, isAsc), params))
        
        # Only make query if ingredients are not empty
        if(len(ingredients) > 0):
            params = "|".join(ingredients)
            if(not isSubs):
                with open("sql_scripts/search/recipeByIngredientsQuery" + ("Missing" if (orderBy == 3) else "") + ".sql") as file:
                    queryText = file.read()
                addToDict(query(queryText + getSort(orderBy, isAsc), params))
            else:
                with open("sql_scripts/search/recipeWithSubsQuery" + ("Missing" if (orderBy == 3) else "") + ".sql") as file:
                    queryText = file.read()
                  
                # If excluded ingredients are provided add additional query text and parameters
                if(len(exclude) > 0):
                    excludes = "|".join(exclude)
                    with open("sql_scripts/search/recipeExcludeWithSubs" + ("Missing" if (orderBy == 3) else "") + ".sql") as file:
                        queryText = file.read()
                    addToDict(query(queryText + getSort(orderBy, isAsc), [params, excludes], True))
                else:
                    addToDict(query(queryText + getSort(orderBy, isAsc), [params], True))
            
        # Only make query if tags are not empty
        if(len(tags) > 0):
            with open("sql_scripts/search/recipeByTagQuery" + ("Missing" if (orderBy == 3) else "") + ".sql") as file:
                queryText = file.read()
            params = [tags, "|".join(ingredients)] if orderBy == 3 else tags
            addToDict(query(queryText + getSort(orderBy, isAsc), params))
        
        # Only make query if exclude is not empty
        if(len(exclude) > 0):
            excludes = "|".join(exclude)
            with open("sql_scripts/search/recipeExcludeIngredients.sql") as file:
                queryText = file.read()
            filtered = query(queryText + ";", excludes)
            filteredIds = list(map(lambda x: x["recipeId"], filtered))

        result["recipes"] = [v for i,v in recipe_dict.items()]
        # Filter out excluded recipes if exclude is not empty
        if(len(exclude) > 0):
            result["recipes"] = list(filter(lambda x: x["recipeId"] in filteredIds, result["recipes"]))
        
        # sort recipes by the correct sort property
        print(result["recipes"])
        if orderBy == 0:
            result["recipes"].sort(key=lambda x: x["score"], reverse=(isAsc==1))
        elif orderBy == 1:
            result["recipes"].sort(key=lambda x: x["difficulty"] if x["difficulty"] != None else 0, reverse=(isAsc==0))
        elif orderBy == 2:
            print(result["recipes"][0])
            result["recipes"].sort(key=lambda x: x["cookTime"] if x["cookTime"] != None else 0, reverse=(isAsc==0))
        elif orderBy == 3:
            result["recipes"].sort(key=lambda x: (x["count"] / x["total"]), reverse=(isAsc==1))

    isEmpty = len(result["recipes"]) == 0
    result["isEmpty"] = isEmpty 

    # if there are no results, backfill query for all recipes
    if (isEmpty):
        # if sorting by missing ingredients, switch to recipeId sort
        if orderBy == 3: 
            orderBy = 0
        with open("sql_scripts/search/recipeAll.sql") as file:
            queryText = file.read()
        result["recipes"] = query(queryText + getSort(orderBy, isAsc))

    return make_response(jsonify(result), 200)

@app.route("/", methods=["GET"])
def get_root_handler():
    return """<a href="/api/recipes">Get recipes</a>"""

# [END gae_python37_cloudsql_mysql]


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
