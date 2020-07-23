-- Returns all recipes with the provided ingredients, allows for substitutions and eliminates excluded ingredients (not subs)
-- Not strict mode
SET @params := %s;
SET @exclude := %s;

SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP @params
  UNION
  SELECT DISTINCT recipeId FROM substitutes
	WHERE substituteName REGEXP @params
) AND recipeId NOT IN (
	SELECT DISTINCT recipeId FROM ingredient
	WHERE foodName REGEXP @exclude
)