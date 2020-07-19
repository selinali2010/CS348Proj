-- Select specific recipe and get substitution details
SELECT i.foodName as foodName, s.substituteName as substituteName, i.quantity as quantity, i.unit as unit
FROM ingredient as i JOIN substitutes as s ON i.recipeId = s.recipeId AND i.foodName = s.foodName
WHERE i.recipeId = %s;