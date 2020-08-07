-- Returns all recipes based on the recipe's name
-- Not strict mode
SELECT * FROM recipe 
WHERE recipeName REGEXP @name