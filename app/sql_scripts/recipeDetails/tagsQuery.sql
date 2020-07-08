-- Returns tags for a specific recipe
SELECT tagName
FROM tags
WHERE recipeId = %s;