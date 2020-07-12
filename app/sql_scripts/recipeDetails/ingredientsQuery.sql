-- Select specific recipe and get all ingredients;
SELECT foodName, quantity, unit
FROM ingredient
WHERE recipeId = %s;