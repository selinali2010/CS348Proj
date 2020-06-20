-- Select specific recipe and get all details;
SELECT tagName
FROM recipe 
JOIN tags 
ON recipe.recipeId = tags.recipeId 
WHERE recipe.recipeId = %s;