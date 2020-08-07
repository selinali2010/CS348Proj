-- Returns all recipes containing any of the searched tags
-- Sort by ingredient match
-- Not strict mode
SELECT r.recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName, IFNULL(count, 0) as count, total
FROM (
  -- Perform normal query
  SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
  FROM recipe
  WHERE recipeId IN (
		SELECT DISTINCT recipeId FROM tags
		WHERE tagName REGEXP @tags
	)
) as r LEFT OUTER JOIN (
  -- Add a count attribute to each result that indicates number of matched ingredients
  SELECT recipe.recipeId, COUNT(foodName) as count
  FROM recipe JOIN ingredient ON recipe.recipeId = ingredient.recipeId
  WHERE foodName REGEXP @params
  GROUP BY recipe.recipeId
) as c ON r.recipeId = c.recipeId JOIN (
  -- Add a total attribute to each result that indicates total number of ingredients
  SELECT recipe.recipeId, COUNT(foodName) as total
  FROM recipe JOIN ingredient ON recipe.recipeId = ingredient.recipeId
  GROUP BY recipe.recipeId
) as t ON r.recipeId = t.recipeId