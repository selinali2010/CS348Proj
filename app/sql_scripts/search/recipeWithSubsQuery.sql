-- Returns all recipes with the provided ingredients and allows for substitutions
-- Not strict mode
SELECT * FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP @params
  UNION
  SELECT DISTINCT recipeId FROM substitutes
	WHERE substituteName REGEXP @params
)