-- Returns tags for a specific recipe
SELECT tagName
FROM recipe 
JOIN tags 
ON recipe.recipeId = tags.recipeId 
WHERE recipe.recipeId = %s;