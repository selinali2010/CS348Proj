-- Returns all recipes with the provided ingredients and allows for substitutions
-- Strict mode
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE recipeId NOT IN (
    SELECT i.recipeId FROM ingredient as i
    WHERE NOT foodName REGEXP %s AND NOT EXISTS (
      SELECT s.substituteName FROM substitutes AS s 
      WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP %s
    )
  )
)
