-- Returns mood type that a user gave to a recipe
SELECT mood
FROM reacts
WHERE userId = %s AND recipeId = %s;