-- Returns all recipes with the provided ingredients and allows for substitutions
-- Strict mode
SET @params := %s;
-- @params is set to %s
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeId NOT IN (
  -- Returns all recipeIds for which both the ingredient and its substitutes do not match
  SELECT DISTINCT i.recipeId FROM ingredient as i
  WHERE NOT foodName REGEXP @params AND NOT EXISTS (
    -- Returns all substitutes for a food that match searched ingredients
    SELECT s.substituteName FROM substitutes AS s 
    WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @params
  )
)