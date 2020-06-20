-- Returns all recipes containing any of the searched tags
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM tags
	WHERE tagName REGEXP %s
);