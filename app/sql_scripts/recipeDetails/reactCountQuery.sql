-- Get count for each mood based on a recipe's id
SELECT mood, COUNT(*) as count
FROM reacts
WHERE recipeId = %s
GROUP BY mood;