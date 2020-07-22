-- Exclude ingredients with substitutes query
-- Work in progress
SET @accept := %s;
SET @exclude := %s;
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeID NOT IN (
  -- Returns all recipeIds for which both the ingredient and its substitutes do NOT match
  SELECT DISTINCT i.recipeId FROM ingredient as i
  WHERE NOT foodName REGEXP @accept AND NOT EXISTS (
    -- Returns all substitutes for a food that match searched ingredients
    SELECT s.substituteName FROM substitutes AS s 
    WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @accept)
  UNION ALL
    -- Returns all recipeIds for which both the ingredient and its substitutes DO match
    SELECT DISTINCT i.recipeId FROM ingredient as i
    WHERE foodName REGEXP @exclude AND EXISTS (
      -- Returns all substitutes for a food that match searched ingredients
      SELECT s.substituteName FROM substitutes AS s 
      WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @exclude)
  UNION ALL
    -- Returns all recipeIds for which the ingredient and its substitutes have opposite results match
    SELECT DISTINCT i.recipeId FROM ingredient as i
    WHERE foodName REGEXP @accept AND NOT foodName REGEXP @exclude AND EXISTS (
      -- Returns all substitutes for a food that match searched ingredients
      SELECT s.substituteName FROM substitutes AS s 
      WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @accept AND NOT s.substituteName REGEXP @exclude)
  UNION ALL
    -- Returns all recipeIds for which both the ingredient and its substitutes have opposite results match
    SELECT DISTINCT i.recipeId FROM ingredient as i
    WHERE NOT foodName REGEXP @accept AND foodName REGEXP @exclude AND EXISTS (
      -- Returns all substitutes for a food that match searched ingredients
      SELECT s.substituteName FROM substitutes AS s 
      WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND NOT s.substituteName REGEXP @accept AND s.substituteName REGEXP @exclude)
)