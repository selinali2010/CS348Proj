-- Returns all recipes with the provided ingredients and allows for substitutions
-- Strict mode
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE recipeId NOT IN (
    SELECT i.recipeId FROM ingredient as i
    WHERE 0 = FIND_IN_SET(i.foodName, %s) AND 0 = (
      SELECT COUNT(*) FROM substitutes AS s 
      WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND NOT 0 = FIND_IN_SET(s.substituteName, %s)
    )
  )
)
