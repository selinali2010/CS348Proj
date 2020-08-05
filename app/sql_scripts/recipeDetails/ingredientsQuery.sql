-- Select specific recipe and get all ingredients, indicate if it is a match and all subs
SET @id := %s;
SET @params := %s;
SELECT i.foodName, i.quantity, i.unit, NOT isNULL(matching.foodName) AS isMatched, GROUP_CONCAT(s.substituteName Separator ',') as subs
FROM ingredient AS i
LEFT OUTER JOIN substitutes as s ON i.recipeId = s.recipeId AND i.foodName = s.foodName
LEFT OUTER JOIN (
  SELECT foodName FROM ingredient
  WHERE recipeid = @id AND foodName REGEXP @params
) AS matching ON i.foodName = matching.foodName
WHERE i.recipeId = @id
GROUP BY i.recipeId, i.foodName, i.quantity, i.unit;