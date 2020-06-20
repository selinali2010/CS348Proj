-- Select specific recipe and get all details;
-- SELECT group_concat(foodName Separator ', ') as ingredients
SELECT foodName, quantity, unit
FROM recipe 
JOIN ingredient 
ON recipe.recipeId = ingredient.recipeId 
WHERE recipe.recipeId = %s;