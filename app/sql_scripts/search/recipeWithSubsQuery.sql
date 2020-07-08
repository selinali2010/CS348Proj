-- Returns all recipes with the provided ingredients and allows for substitutions
-- Not strict mode
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP %s
  UNION
  SELECT DISTINCT recipeId FROM substitutes
	WHERE substituteName REGEXP %s
);