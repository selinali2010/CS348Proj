-- //////// SEARCH RELATED SCRIPTS //////// --
USE db_1;

-- Returns all recipes
SELECT * FROM recipe
LIMIT 10;

-- Returns all recipes with the provided ingredients (Not strict mode)
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP "spinach|eggs|tomato"
)
LIMIT 10;

-- Returns all recipes based on the recipe's name
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeName REGEXP "soup|stock"
LIMIT 10;

-- Returns all recipes containing any of the searched tags
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM tags
	WHERE tagName REGEXP "vegetarian|vegan"
)
LIMIT 10;

-- Returns all recipes with the provided ingredients and allows for substitutions (Not strict mode)
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP "sugar|butter"
  UNION
  SELECT DISTINCT recipeId FROM substitutes
	WHERE substituteName REGEXP "sugar|butter"
)
LIMIT 10;

-- //////// USER RELATED SCRIPTS //////// --

-- Returns all favourited recipes
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM reacts
	WHERE userId = 11 AND mood = 1
)
LIMIT 10;

-- Find user id based on user name
SELECT userId FROM user WHERE userName = "robnadal";

-- Delete the reacts for a certain recipe
DELETE FROM reacts WHERE recipeId = 54272;
-- Add a react for a recipe made by a user
INSERT INTO reacts VALUES(1, 54272, 5);
INSERT INTO reacts VALUES(2, 54272, 1);
INSERT INTO reacts VALUES(3, 54272, 4);
INSERT INTO reacts VALUES(4, 54272, 3);
INSERT INTO reacts VALUES(5, 54272, 2);
INSERT INTO reacts VALUES(6, 54272, 3);
INSERT INTO reacts VALUES(7, 54272, 1);
INSERT INTO reacts VALUES(8, 54272, 2);
INSERT INTO reacts VALUES(11, 54272, 3);

-- Delete user from database
DELETE FROM user WHERE userName = "hemitshah";
-- Insert a new user into the user table
INSERT INTO user(userName, password, skillLevel) VALUES("hemitshah", "cs348s2020", "5");

-- Returns mood type that a user gave to a recipe
SELECT mood
FROM reacts
WHERE userId = 11 AND recipeId = 54272;


-- //////// RECIPE DETAILS RELATED SCRIPTS //////// --

-- Select specific recipe and get all ingredients;
SELECT foodName, quantity, unit
FROM ingredient
WHERE recipeId = 54272;

-- Get count for each mood based on a recipe's id
SELECT mood, COUNT(*) as count
FROM reacts
WHERE recipeId = 54272
GROUP BY mood;

-- Select specific recipe and get substitution details
SELECT s.substituteName as foodName, i.quantity, i.unit
FROM ingredient as i JOIN substitutes as s ON i.recipeId = s.recipeId AND i.foodName = s.foodName
WHERE i.recipeId = 3;

-- Returns tags for a specific recipe
SELECT tagName
FROM tags
WHERE recipeId = 54272;