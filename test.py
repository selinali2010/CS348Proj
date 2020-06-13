#./cloud_sql_proxy  -instances=cs348s2020:us-central1:cs348-1=tcp:3306 -credential_file=creds.json
import pymysql
import pymysql.cursors
connection = pymysql.connect(host='127.0.0.1', #unix_socket='./cloudsql/cs348s2020:us-central1:cs348-1',
                             user='root',
                             password='cs348',
                             db='db_1',
                             local_infile=True)

with connection:

    cur = connection.cursor()
    cur.execute("SELECT * FROM recipe")

    rows = cur.fetchall()

    for row in rows:
        print(row)

    # code to run the sql script:
    # for line in open("sql_scripts/populate_recipes.sql"):
    #     print(line)
    #     cur.execute(line)