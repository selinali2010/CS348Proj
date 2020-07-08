-- Select specific recipe and get substitution details
SELECT s.substituteName as foodName, i.quantity, i.unit
FROM ingredient as i JOIN substitutes as s ON i.recipeId = s.recipeId AND i.foodName = s.foodName
WHERE i.recipeId = %s;