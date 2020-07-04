import foodmood_lists as FM
import functools
import pandas
from pandas.io import sql
import sqlalchemy
import pymysql
import numpy

recipe_data = pandas.read_csv("RAW_recipes.csv")

def listify(tag_string):
    return [tag.strip("'") for tag in tag_string.strip('][').split(", ")]

tag_lists = recipe_data['tags'].apply(listify)
unique_tags = functools.reduce(lambda a,b: set(a).union(set(b)), tag_lists.to_list())

recipe_data.ingredients = recipe_data.ingredients.apply(listify)
recipe_data.tags = recipe_data.tags.apply(listify)
recipe_data.nutrition = recipe_data.nutrition.apply(listify)
recipe_data.steps = recipe_data.steps.apply(listify)

units = ['tsp', 'tbsp', 'oz', 'cup', 'pint', 'quart', 'gallon', 'mL', 'L', 'dL', 'lb', 'mg', 'g', 'kg']
rand_units = [units[i%14] for i in range(2103719)]

ingredient_table = recipe_data[['id', 'ingredients']].explode('ingredients')
ingredient_table['quantity'] = numpy.random.randint(1,10, ingredient_table.shape[0])
ingredient_table['units'] = rand_units
ingredient_table.columns = ['recipeId', 'foodName', 'quantity', 'units']

tag_table = recipe_data[['id', 'tags']].explode('tags')
tag_table = tag_table[~tag_table.tags.isin(FM.labels) & (~tag_table.tags.isin(FM.cuisines))]
tag_table.columns = ['recipeId', 'tags']

recipe_table = recipe_data[['id', 'name', 'minutes', 'n_steps', 'tags', 'n_ingredients', 'contributor_id']]
recipe_table.columns = ['recipeId', 'recipeName', 'cookTime', 'difficulty', 'cuisine', 'servings', 'authorName']

def find_tags(tags, tag_set):
    tagged = list(set(tags).intersection(tag_set))
    if tagged:
        return tagged[-1]
    else:
        return None

recipe_table.cuisine = recipe_table.cuisine.apply(find_tags, args=(FM.cuisines,))

names = pandas.read_csv('StateNames.csv').Name

def id_toName(authorID):
    return names[authorID%names.size]

recipe_table.authorName = recipe_table.authorName.apply(id_toName)

recipe_table['instructionsLink'] = "https://www.food.com/recipe/" + recipe_table.recipeName.str.replace('\s+', '-').str.cat(recipe_table.recipeId.astype('str'), '-')

from google_images_search import GoogleImagesSearch
foodImage = GoogleImagesSearch('AIzaSyD2rcfk46g_ZfpPH1YV59snFCW2T0OOeI8', '017970115376021606908:q3caxr88ame')

def find_image(recipe_name):

    _searchParams = {
        'q': recipe_name,
        'num': 1,
        'fileType': 'jpg|png'
    }
    foodImage.search(search_params=_searchParams)
    if foodImage.results():
        return foodImage.results()[0].url
    else:
        return None

recipe_test = recipe_table.head(5)
recipe_test['imageUrl'] = recipe_test.recipeName.convert_dtypes().str.replace('\s+', ' ').apply(find_image)

mySql_config = {
    "pool_size": 5,
    "max_overflow": 2,
    "pool_timeout": 30,
    "pool_recycle": 1800,
}
mySql_engine = sqlalchemy.create_engine(
                sqlalchemy.engine.url.URL(
                    drivername="mysql+pymysql",
                    username='root',
                    password='cs348',
                    host='127.0.0.1',
                    port='3306',
                    database='db_1',
                ),
                **mySql_config
            )
mySql_connection = mySql_engine.connect()

from sqlalchemy.types import Integer
from sqlalchemy.types import String
try:
    recipe_frame = recipe_table.to_sql('recipes', mySql_connection, if_exists='replace', 
                        index=False, chunksize=50, 
                        dtype={'recipeId': Integer(), 'recipeName': String(), 'cookTime': Integer(), 
                                'difficulty': Integer(), 'cuisine': String(), 'servings': Integer(),      
                                'authorName': String()})

    ingredient_frame = ingredient_table.to_sql('ingredients', mySql_connection, if_exists='replace',
                        index=False, chunksize=50,
                        dtype={'recipeId': Integer(), 'foodName': String(), 'qantity': Integer(), 
                                'units': String()})

    tag_frame = tag_table.to_sql('tags', mySql_connection, if_exists='replace',
                        index=False, chunksize=50,
                        dtype={'recipeId': String(), 'tags': String()})

except ValueError as vx:
    print(vx)

except Exception as ex:   
    print(ex)

else:
    print("Tables created successfully");   

finally:
    mySql_Connection.close()