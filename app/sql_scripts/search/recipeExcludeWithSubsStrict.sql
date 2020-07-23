-- Returns all recipes with the provided ingredients, allows for substitutions and eliminates excluded ingredients
-- Strict mode
SET @accept := %s;
SET @exclude := %s;

SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeID NOT IN (
  -- Returns all recipeIds for which the ingredient does not satisfy the search and none of its substitutions are valid
  SELECT DISTINCT i.recipeId FROM ingredient as i
  WHERE NOT foodName REGEXP @accept AND NOT EXISTS (
    -- Returns all subs for an ingredient that satisfies the search and is not exluded (a.k.a. it is valid)
    SELECT s.substituteName FROM substitutes AS s 
    WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @accept AND NOT s.substituteName REGEXP @exclude)
  UNION ALL
    -- Returns all recipeIds for which the ingredient matches @excludes and none of its substitutes are valid
    SELECT DISTINCT i.recipeId FROM ingredient as i
    WHERE foodName REGEXP @exclude AND NOT EXISTS (
      -- Returns all subs for an ingredient that satisfies the search and is not exluded (a.k.a. it is valid)
      SELECT s.substituteName FROM substitutes AS s 
      WHERE i.foodName = s.foodName AND i.recipeId = s.recipeId AND s.substituteName REGEXP @accept AND NOT s.substituteName REGEXP @exclude)
)