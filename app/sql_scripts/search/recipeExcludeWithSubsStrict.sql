-- Returns all recipes with the provided ingredients, allows for substitutions and eliminates excluded ingredients
-- Strict mode
SET @accept := %s;
SET @exclude := %s;

SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeID NOT IN (
  -- Returns all recipeIds for which both the ingredient and at least one of its substitutes do not match @accept
  SELECT DISTINCT i.recipeId FROM ingredient as i
  WHERE NOT foodName REGEXP @accept AND NOT EXISTS (
    SELECT s.substituteName FROM substitutes AS s 
    WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @accept)
  UNION ALL
    -- Returns all recipeIds for which both the ingredient and at least one of its substitutes match @excludes
    SELECT DISTINCT i.recipeId FROM ingredient as i
    WHERE foodName REGEXP @exclude AND EXISTS (
      SELECT s.substituteName FROM substitutes AS s 
      WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @exclude)
  UNION ALL
    -- Returns all recipeIds for which the ingredient does not match either @accept or @exclude and at least one of its substitutes matches both
    SELECT DISTINCT i.recipeId FROM ingredient as i
    WHERE foodName REGEXP @accept AND foodName REGEXP @exclude AND EXISTS (
      -- Returns all substitutes for a food that match searched ingredients
      SELECT s.substituteName FROM substitutes AS s 
      WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND NOT s.substituteName REGEXP @accept AND NOT s.substituteName REGEXP @exclude)
  UNION ALL
    -- Returns all recipeIds for which the ingredient matches both @accept and @exclude and at least one of its substitutes does not match either
    SELECT DISTINCT i.recipeId FROM ingredient as i
    WHERE NOT foodName REGEXP @accept AND NOT foodName REGEXP @exclude AND EXISTS (
      SELECT s.substituteName FROM substitutes AS s 
      WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @accept AND s.substituteName REGEXP @exclude)
)