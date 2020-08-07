-- Returns all recipes based on the recipe's name
-- Strict mode
SELECT recipeId FROM recipe 
WHERE recipeName REGEXP @name