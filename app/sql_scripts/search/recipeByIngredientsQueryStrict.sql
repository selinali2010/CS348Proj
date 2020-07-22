-- Returns all recipes with the provided ingredients
-- Strict mode
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId NOT IN (
  -- Returns recipeIds that don't have a match
  SELECT recipeId FROM ingredient 
  WHERE NOT foodName REGEXP %s
)