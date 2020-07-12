-- Returns all favourited recipes
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM reacts
	WHERE userId = %s AND mood = 1
)