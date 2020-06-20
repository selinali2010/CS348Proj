-- Returns all recipes
SELECT * FROM recipe;

-- Returns ingredients for a specific recipe
SELECT foodName, quantity, unit
FROM recipe 
JOIN ingredient 
ON recipe.recipeId = ingredient.recipeId 
WHERE recipe.recipeId = 1;

-- Returns tags for a specific recipe
SELECT tagName
FROM recipe 
JOIN tags 
ON recipe.recipeId = tags.recipeId 
WHERE recipe.recipeId = 1;

-- Returns all recipes based on the recipe's name
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeName REGEXP "pie";

-- Returns all recipes with the provided ingredients, Not strict mode
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP "sugar|tapioca"
);

-- Returns all recipes containing any of the searched tags
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM tags
	WHERE tagName REGEXP "nut free|drink"
);