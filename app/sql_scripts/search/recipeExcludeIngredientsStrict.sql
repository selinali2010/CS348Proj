-- Returns all recipes with excluded ingredients eliminated
-- Strict mode
SELECT recipeId FROM recipe
WHERE recipeId NOT IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP @exclude
)