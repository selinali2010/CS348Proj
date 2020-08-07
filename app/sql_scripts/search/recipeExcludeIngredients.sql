-- Returns all recipes with excluded ingredients eliminated
-- Both non-strict and strict mode
SELECT recipeId FROM recipe
WHERE recipeId NOT IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP @exclude
)