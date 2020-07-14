#!/usr/bin/env python
# coding: utf-8

# In[1]:


import foodmood_lists as FM
import functools
import pandas
from pandas.io import sql
import sqlalchemy
import pymysql
import numpy


# In[2]:


recipe_data = pandas.read_csv("RAW_recipes.csv").head(100)


# In[3]:


def listify(tag_string):
    return [tag.strip("'") for tag in tag_string.strip('][').split(", ")]


# In[4]:


tag_lists = recipe_data['tags'].apply(listify)
unique_tags = functools.reduce(lambda a,b: set(a).union(set(b)), tag_lists.to_list())


# In[5]:


recipe_data.ingredients = recipe_data.ingredients.apply(listify)
recipe_data.tags = recipe_data.tags.apply(listify)
recipe_data.nutrition = recipe_data.nutrition.apply(listify)
recipe_data.steps = recipe_data.steps.apply(listify)


# In[6]:


units = ['tsp', 'tbsp', 'oz', 'cup', 'pint', 'quart', 'gallon', 'mL', 'L', 'dL', 'lb', 'mg', 'g', 'kg']


# In[7]:


ingredient_table = recipe_data[['id', 'ingredients']].explode('ingredients')
ingredient_table['quantity'] = numpy.random.randint(1,10, ingredient_table.shape[0])
rand_units = [units[i%14] for i in range(ingredient_table.shape[0])]
ingredient_table['units'] = rand_units
ingredient_table.columns = ['recipeId', 'foodName', 'quantity', 'unit']


# In[8]:


ingredient_table


# In[9]:


tag_table = recipe_data[['id', 'tags']].explode('tags')
tag_table = tag_table[~tag_table.tags.isin(FM.labels) & (~tag_table.tags.isin(FM.cuisines))]
tag_table.columns = ['recipeId', 'tagName']


# In[10]:


tag_table


# In[11]:


recipe_table = recipe_data[['id', 'name', 'minutes', 'n_steps', 'tags', 'n_ingredients', 'contributor_id']]
recipe_table.columns = ['recipeId', 'recipeName', 'cookTime', 'difficulty', 'cuisine', 'servings', 'authorName']


# In[12]:


def find_tags(tags, tag_set):
    tagged = list(set(tags).intersection(tag_set))
    if tagged:
        return tagged[-1]
    else:
        return None


# In[13]:


recipe_table.cuisine = recipe_table.cuisine.apply(find_tags, args=(FM.cuisines,))


# In[14]:


names = pandas.read_csv('StateNames.csv').Name


# In[15]:


def id_toName(authorID):
    return names[authorID%names.size]


# In[16]:


recipe_table.authorName = recipe_table.authorName.apply(id_toName)


# In[17]:


recipe_table['instructionsLink'] = "https://www.food.com/recipe/" + recipe_table.recipeName.str.replace('\s+', '-').str.cat(recipe_table.recipeId.astype('str'), '-')


# In[18]:


recipe_table = recipe_table.dropna()


# In[19]:


recipe_table.recipeName = recipe_table.recipeName.str.replace('\s+', ' ').str.title()
recipe_table.cuisine = recipe_table.cuisine.str.title()


# In[20]:


recipe_table


# In[21]:


keyFile = open("APIkey.txt", "r")
key = keyFile.read()
keyFile.close()


# In[22]:


from google_images_search import GoogleImagesSearch
foodImage = GoogleImagesSearch(key, '017970115376021606908:q3caxr88ame')


# In[24]:


imageLinks = []
recipe_names = recipe_table.recipeName.to_list()


# In[23]:



for recipe_name in recipe_names:

    _searchParams = {
        'q': recipe_name,
        'num': 1,
        'fileType': 'jpg|png'
    }
    try:
        foodImage.search(search_params=_searchParams)

        if foodImage.results():
            imageLinks.append(foodImage.results()[0].url)
        else:
            imageLinks.append(None)
    except:
        imageLinks.append(None)


# In[38]:


recipe_table['imageUrl'] = imageLinks
recipe_table = recipe_table.dropna()


# **Run in the shell** 
# 
# ./cloud_sql_proxy -instances=cs348s2020:us-central1:cs348-1=tcp:3306

# In[34]:


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


# In[35]:


from sqlalchemy.types import Integer
from sqlalchemy.types import String

mySql_connection = mySql_engine.connect()
try:
    recipe_frame = recipe_table.to_sql('recipe', mySql_connection, if_exists='replace', 
                        index=False, chunksize=50, 
                        dtype={'recipeId': Integer(), 'recipeName': String(60), 'cookTime': Integer(), 
                                'difficulty': Integer(), 'cuisine': String(40), 'servings': Integer(),      
                                'authorName': String(40), 'instructionsLink': String(225), 'imageUrl': String(225)})

    ingredient_frame = ingredient_table.to_sql('ingredient', mySql_connection, if_exists='replace',
                        index=False, chunksize=50,
                        dtype={'recipeId': Integer(), 'foodName': String(255), 'qantity': Integer(), 
                                'unit': String(20)})

    tag_frame = tag_table.to_sql('tags', mySql_connection, if_exists='replace',
                        index=False, chunksize=50,
                        dtype={'recipeId': String(24), 'tagName': String(40)})

except ValueError as vx:
    print(vx)

except Exception as ex:   
    print(ex)

else:
    print("Tables created successfully");   

finally:
    mySql_connection.close()


# In[ ]:




