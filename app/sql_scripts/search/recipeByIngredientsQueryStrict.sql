-- Returns all recipes with the provided ingredients
-- Strict mode
SELECT recipeId FROM recipe 
WHERE recipeId NOT IN (
  -- Returns recipeIds that don't have a match
  SELECT recipeId FROM ingredient 
  WHERE NOT foodName REGEXP @params
) AND recipeId IN (
  -- Recipe must have an ingredient
  SELECT recipeId FROM ingredient
)