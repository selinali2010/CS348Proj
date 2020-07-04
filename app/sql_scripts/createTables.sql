CREATE TABLE recipe (
  recipeId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  recipeName VARCHAR(60) NOT NULL,
  cookTime INT,
  difficulty SMALLINT,
  cuisine VARCHAR(40),
  servings INT NOT NULL,
  imageUrl VARCHAR(225),
  instructionsLink VARCHAR(225),
  authorName VARCHAR(40)
);
CREATE TABLE user
( 
  userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  skillLevel SMALLINT
);
CREATE TABLE ingredient (
  recipeId INT NOT NULL,
  foodName VARCHAR(255) NOT NULL, 
  quantity FLOAT, 
  unit VARCHAR(20),
  PRIMARY KEY(recipeId, foodName),
  FOREIGN KEY(recipeId) REFERENCES recipe(recipeId)
);
CREATE TABLE reacts
( 
	userId INT(24) NOT NULL,
	recipeId INT(24) NOT NULL,
	mood SMALLINT NOT NULL CHECK (mood BETWEEN 1 AND 6),
	PRIMARY KEY (userId, recipeId),
	FOREIGN KEY (userId) REFERENCES user(userId),
	FOREIGN KEY (recipeId) REFERENCES recipe(recipeId)
);
CREATE TABLE substitutes
( 
  recipeId INT(24) NOT NULL,
  foodName VARCHAR(30) NOT NULL,
  substituteName VARCHAR(30) NOT NULL,
  PRIMARY KEY(recipeId, foodName, substituteName),
  FOREIGN KEY(recipeId, foodName) REFERENCES ingredient(recipeId, foodName)
);
CREATE TABLE tags
( 
	recipeId INT(24),
	tagName VARCHAR(40),
	PRIMARY KEY (recipeId, tagName),
	FOREIGN KEY (recipeId) REFERENCES recipe(recipeId)
);
