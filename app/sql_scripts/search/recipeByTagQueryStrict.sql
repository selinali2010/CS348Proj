-- Returns all recipes containing any of the searched tags
-- Strict mode (uses @tags)
SELECT recipeId
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM tags
	WHERE tagName REGEXP @tags
)