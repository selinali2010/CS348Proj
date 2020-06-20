-- Selects recipes and gives the ingredients in the recipes;
SELECT recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName
FROM recipe 
WHERE recipeName REGEXP %s;