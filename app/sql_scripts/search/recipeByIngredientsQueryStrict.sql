-- Returns all recipes with the provided ingredients
-- Strict mode
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
  SELECT DISTINCT recipeId FROM ingredient
  WHERE recipeId NOT IN (
    SELECT recipeId FROM ingredient 
    WHERE NOT foodName REGEXP %s
  )
)