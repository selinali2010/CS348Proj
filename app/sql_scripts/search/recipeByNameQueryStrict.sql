-- Returns all recipes based on the recipe's name
-- Strict mode (uses @name)
SELECT recipeId
FROM recipe 
WHERE recipeName REGEXP @name