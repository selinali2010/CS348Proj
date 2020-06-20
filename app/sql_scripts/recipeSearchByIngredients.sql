-- Returns all recipes with the provided ingredients
-- strict mode
SELECT recipeId FROM ingredient
EXCEPT
SELECT recipeId FROM ingredient
WHERE foodName NOT IN
	(-- SQL view of passed in ingredient filters
	)