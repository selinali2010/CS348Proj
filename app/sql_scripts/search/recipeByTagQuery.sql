-- Returns all recipes containing any of the searched tags
-- Not strict mode
SELECT * FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM tags
	WHERE tagName REGEXP @tags
)