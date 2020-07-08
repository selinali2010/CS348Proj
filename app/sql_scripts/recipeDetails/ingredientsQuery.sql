-- Select specific recipe and get all details;
-- SELECT group_concat(foodName Separator ', ') as ingredients
SELECT foodName, quantity, unit
FROM ingredient
WHERE recipeId = %s;