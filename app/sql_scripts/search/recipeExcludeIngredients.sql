AND recipeId NOT IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP %s
)