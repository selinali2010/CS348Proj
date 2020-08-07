-- Returns all recipes with the provided ingredients
-- Not strict mode
SELECT * FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP @params
)