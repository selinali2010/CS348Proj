-- Adds a new recipe to recipe table
-- Sets @last_recipe_id to recipeID
INSERT INTO recipe (recipeName, servings, cookTime, difficulty, cuisine, imageURL, instructionsLink, authorName) values (%s, %s, %s, %s, %s, %s, %s, %s);
SET @last_recipe_id := LAST_INSERT_ID();