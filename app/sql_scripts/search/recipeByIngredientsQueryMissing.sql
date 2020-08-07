-- Returns all recipes based on the recipe's name
-- Sort by ingredient match
-- Not strict mode
SELECT r.recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName, count, total
FROM (
  -- Determine all recipes with matching ingredients and add a "count" attribute to each result that indicates number of matched ingredients
  SELECT recipe.recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName, COUNT(foodName) as count
  FROM recipe JOIN ingredient ON recipe.recipeId = ingredient.recipeId
  WHERE foodName REGEXP @params
  GROUP BY recipe.recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
) as r JOIN (
  -- Add a total attribute to each result that indicates total number of ingredients
  SELECT recipe.recipeId, COUNT(foodName) as total
  FROM recipe JOIN ingredient ON recipe.recipeId = ingredient.recipeId
  GROUP BY recipe.recipeId
) as t ON r.recipeId = t.recipeId