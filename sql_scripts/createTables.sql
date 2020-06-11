CREATE TABLE recipe (
  recipeId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  recipeName VARCHAR(60) NOT NULL,
  cookTime INT,
  difficulty SMALLINT,
  cuisine VARCHAR(40),
  servings INT NOT NULL,
  imageUrl VARCHAR(40),
  instructionsLink VARCHAR(40),
  authorName VARCHAR(40)
);
CREATE TABLE user
( 
  userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(16) NOT NULL,
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
	mood VARCHAR(30) NOT NULL,
	PRIMARY KEY (userId, recipeId),
	FOREIGN KEY (userId) REFERENCES user(userId),
	FOREIGN KEY (recipeId) REFERENCES recipe(recipeId)
);
CREATE TABLE substitutes
( 
  foodName VARCHAR(30) NOT NULL,
  substituteName VARCHAR(30) NOT NULL,
  PRIMARY KEY(foodName, substituteName),
  FOREIGN KEY(foodName) REFERENCES ingredients(foodName),
  FOREIGN KEY(substituteName) REFERENCES ingredients(foodName)
);
CREATE TABLE tags
( 
	recipeId INT(24),
	tagName VARCHAR(40),
	PRIMARY KEY (recipeId, tagName),
	FOREIGN KEY (recipeId) REFERENCES recipe(recipeId)
);
CREATE TABLE owns
( 
  userId INT NOT NULL,
  equipmentName VARCHAR(30) NOT NULL,
  PRIMARY KEY(userId, equipmentName),
  FOREIGN KEY(userId) REFERENCES user(userId)
);
CREATE TABLE requiredfor
( 
	recipeId INT NOT NULL,
	equipmentName VARCHAR(30) NOT NULL,
	PRIMARY KEY (recipeId, equipmentName),
	FOREIGN KEY (recipeId) REFERENCES recipe(recipeId)
);
