-- Selects recipes and gives the ingredients in the recipes
SELECT recipeName, group_concat(foodName Separator ',') 
FROM recipe 
JOIN ingredient 
ON recipe.recipeId = ingredient.recipeId 
WHERE recipeName REGEXP 'pie|cake'
GROUP BY recipeName;