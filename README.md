# CS348Proj

## Starting local server
Ensure you have a credentials file for your GCP MySQL server.
```creds.json```

Download the cloud_sql_proxy binary.
```wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy```

Start your proxy in a terminal.
```./cloud_sql_proxy  -instances=cs348s2020:us-central1:cs348-1=tcp:3306 -credential_file=creds.json```

In a new terminal, start your server.
```python test.py```

## Sample Database
To create sample tables, run the commands in ```sql_scripts/createTables.sql```.

To populate tables with sample data, run the commands in ```sql_scripts/populateTables.sql```.

To drop sample tables, run the commands in ```sql_scripts/dropTables.sql```.

## Generating the Production Database
Make sure you have run the above to create the sample tables, population with sample data is optional as none of the data from the dataset used to generate the production dataset conflicts with the sample data.

To get the raw data, download the CSV file at the link [https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions?select=RAW_recipes.csv]

You can then run the ```extract_data.py``` script to extract and generate the production database. Modify lines 215 to 220 to ensure you have the proper parameters for a connection to your SQL database.
```python
drivername="mysql+pymysql",
username='root',
password='cs348',
host='127.0.0.1',
port='3306',
database='db_1',
```

## Features Implemented
