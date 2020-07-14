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
Make sure you have run the above to create the sample tables and populate the tables with sample data.

To get the raw data, download the CSV file at the link [https://www.kaggle.com/shuyangli94/food-com-recipes-and-user-interactions?select=RAW_recipes.csv]
You will also need the following CSV file used for random recipe.authorName generation [https://www.kaggle.com/kaggle/us-baby-names?select=StateNames.csv]

You can then run the ```extract_data.py``` script to extract and generate the production database. Ensure the script is located in the same directory as the above CSV files. Modify lines 215 to 220 to ensure you have the proper parameters for a connection to your SQL database, and ensure you have a local connection to the server before running the script.
```python
drivername="mysql+pymysql",
username='root',
password='',
host='127.0.0.1',
port='3306',
database='db_1',
```
For the sake of simplicity, the use of a custom google search module for finding image links online for the recipe.imageUrl attribute has been left out if you do wish to run the script. To see the code used to generate image URLs please see the ```extract_data.ipynb``` script.

## Features Implemented
**Basic Search:** Users can view a list of recipes based on keywords
- Scripts with SQL queries: app/sql_scripts/search/*
- Backend endpoint: app/main.py
- Frontend: 
  - search parameters are collected and results queried from cs348-frontend/src/components/SearchContentBox.js
  - results displayed in cs348-frontend/src/components/ResultsContentBox.js

**Sort Results:** Users can order/sort recipe results by one of the following
- Adding order by to SQL query: app/main.py
- Backend endpoint: app/main.py
- Frontend:
  - User can modify orderBy parameters in the content header of cs348-frontend/src/components/ResultsContentBox.js, 
  - OrderBy parameters are combined combined with the recipe results fetch in  cs348-frontend/src/components/SearchContentBox.js

**User Account:** Users can create an account (register) and log into the application
- Scripts with SQL queries: 
  - app/sql_scripts/user/getUserIdQuery.sql, app/sql_scripts/user/insertUser.sql, app/sql_scripts/user/signInQuery.sql
- Backend endpoint: app/main.py
- Frontend: 
  - User login information is collected, validated, and sent to the backend from cs348-frontend/src/components/UserContentBox.js
  - User account information is stored and displayed in cs348-frontend/src/components/AccountContentBox.js

**Add-a-Mood:** Logged in users can submit reactions on new recipes that they view
- Scripts with SQL queries: 
  - app/sql_scripts/user/deleteReact.sql, app/sql_scripts/user/insertReact.sql, app/sql_scripts/user/moodQuery.sql
- Backend endpoint: app/main.py
- Frontend: 
  - Users can react to a recipe by clicking on any of the emojis in the graph displayed on recipe modal, which is implemented in cs348-frontend/src/components/Chart.js, Emoji.js

**Recipe Mood Filter:** Users can view recipes to which they’ve reacted with heart eyes
- Scripts with SQL queries: app/sql_scripts/user/favouritesQuery.sql
- Backend endpoint: app/main.py
- Frontend: 
  - Favorite recipe results are fetched and displayed from cs348-frontend/src/components/FavoriteContentBox.js
  - Recipe Details: User’s can select recipes for more information (modal) such as :
- Scripts with SQL queries: app/sql_scripts/recipeDetails/*
- Backend endpoint: app/main.py
- Frontend:
  - Recipe details displayed in a modal whose content is fetched and organized from cs348-frontend/src/components/RecipeDetails.js
  - Reaction chart details and emojis defined in cs348-frontend/src/components/Chart.js and cs348-frontend/src/components/Emoji.js
