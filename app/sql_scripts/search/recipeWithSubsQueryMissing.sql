-- Returns all recipes with the provided ingredients and allows for substitutions
-- Sort by ingredient match
-- Not strict mode
SELECT r.recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName, count, total
FROM (
  -- Perform normal query
  SELECT recipe.recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName, COUNT(foodName) as count
  FROM recipe JOIN ingredient ON recipe.recipeId = ingredient.recipeId
  WHERE foodName REGEXP @params OR EXISTS (
		SELECT s.substituteName FROM substitutes AS s 
    WHERE ingredient.foodName = s.foodName AND recipe.recipeId = s.recipeId AND s.substituteName REGEXP @params
	)
	-- Add a count attribute to each result that indicates number of matched ingredients
  GROUP BY recipe.recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
) as r JOIN (
	-- Add a total attribute to each result that indicates total number of ingredients
  SELECT recipe.recipeId, COUNT(foodName) as total
  FROM recipe JOIN ingredient ON recipe.recipeId = ingredient.recipeId
  GROUP BY recipe.recipeId 
) as t ON r.recipeId = t.recipeId