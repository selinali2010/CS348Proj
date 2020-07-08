-- Delete a react for a recipe made by a user
DELETE FROM reacts WHERE userId = %s AND recipeId = %s;