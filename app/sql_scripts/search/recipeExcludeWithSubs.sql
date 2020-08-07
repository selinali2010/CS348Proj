-- Returns all recipes with the provided ingredients, allows for substitutions and eliminates excluded ingredients (not subs)
-- Not strict mode
SELECT * FROM recipe 
WHERE recipeId IN (
	-- Returns all ingredients or substitutions that match
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP @params
  UNION
  SELECT DISTINCT recipeId FROM substitutes
	WHERE substituteName REGEXP @params
) AND recipeId NOT IN (
	-- Returns all recipes that should be excluded
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP @exclude
)