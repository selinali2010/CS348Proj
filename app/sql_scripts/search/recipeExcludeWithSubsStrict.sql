-- Returns all recipes with the provided ingredients, allows for substitutions and eliminates excluded ingredients
-- Strict mode
SELECT recipeId FROM recipe
WHERE recipeId NOT IN (
  -- Returns all recipeIds for which the ingredient does not satisfy the search and none of its substitutions are valid
  SELECT DISTINCT i.recipeId FROM ingredient as i
  WHERE (NOT foodName REGEXP @params OR foodName REGEXP @exclude) AND NOT EXISTS (
    -- Returns all subs for an ingredient that satisfies the search and is not exluded (a.k.a. it is valid)
    SELECT s.substituteName FROM substitutes AS s
    WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @params AND NOT s.substituteName REGEXP @exclude)
) AND recipeId IN (
  -- Recipe must have an ingredient
  SELECT recipeId from ingredient
)