-- Returns all favourited recipes
SELECT * FROM recipe
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM reacts
	WHERE userId = %s AND mood = %s
)