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

from flask import Flask
import pymysql

app = Flask(__name__)


@app.route('/')
def main():
    # When deployed to App Engine, the `GAE_ENV` environment variable will be
    # set to `standard`

    # If deployed, use the local socket interface for accessing Cloud SQL
    connection = pymysql.connect(user='root', password='cs348', unix_socket='/cloudsql/cs348s2020:us-central1:cs348-1', db='cs348-1')

    with connection:

        cur = connection.cursor()
        cur.execute("SELECT * FROM recipe")

        rows = cur.fetchall()

        for row in rows:
            print(row)

    return
# [END gae_python37_cloudsql_mysql]


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
