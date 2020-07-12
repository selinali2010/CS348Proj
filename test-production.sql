-- //////// SEARCH RELATED SCRIPTS //////// --

-- Returns all recipes
SELECT * FROM recipe;
-- Returns all recipes with the provided ingredients (Not strict mode)
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP %s
);
-- Returns all recipes based on the recipe's name
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeName REGEXP %s;
-- Returns all recipes containing any of the searched tags
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM tags
	WHERE tagName REGEXP %s
);
-- Returns all recipes with the provided ingredients and allows for substitutions (Not strict mode)
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP %s
  UNION
  SELECT DISTINCT recipeId FROM substitutes
	WHERE substituteName REGEXP %s
);

-- //////// USER RELATED SCRIPTS //////// --

-- Delete a react for a recipe made by a user
DELETE FROM reacts WHERE userId = %s AND recipeId = %s;
-- Returns all favourited recipes
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM reacts
	WHERE userId = %s AND mood = 1
);
-- Find user id based on user name
SELECT userId FROM user WHERE userName = %s;
-- Add a react for a recipe made by a user
INSERT INTO reacts VALUES(%s, %s, %s);
-- Insert a new user into the user table
INSERT INTO user(userName, password, skillLevel) VALUES(%s, %s, %s);
-- Returns mood type that a user gave to a recipe
SELECT mood
FROM reacts
WHERE userId = %s AND recipeId = %s;
-- Returns mood type that a user gave to a recipe
SELECT mood
FROM reacts
WHERE userId = %s AND recipeId = %s;

-- //////// RECIPE DETAILS RELATED SCRIPTS //////// --

-- Select specific recipe and get all ingredients;
SELECT foodName, quantity, unit
FROM ingredient
WHERE recipeId = %s;
-- Get count for each mood based on a recipe's id
SELECT mood, COUNT(*) as count
FROM reacts
WHERE recipeId = %s
GROUP BY mood;
-- Select specific recipe and get substitution details
SELECT s.substituteName as foodName, i.quantity, i.unit
FROM ingredient as i JOIN substitutes as s ON i.recipeId = s.recipeId AND i.foodName = s.foodName
WHERE i.recipeId = %s;
-- Returns tags for a specific recipe
SELECT tagName
FROM tags
WHERE recipeId = %s;