-- Gets ingredient list for all recipes in table
SELECT recipeName, group_concat(foodName Separator ',') 
FROM recipe 
JOIN ingredient 
ON recipe.recipeId = ingredient.recipeId 
GROUP BY recipeName;