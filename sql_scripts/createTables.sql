CREATE TABLE recipe (
  rid INT NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  cookTime INT,
  difficulty SMALLINT,
  cuisine varchar(255),
  servings INT NOT NULL, 
  image varchar(255), 
  url varchar(255),
  author varchar(255),
  PRIMARY KEY(rid)
);

CREATE TABLE ingredient (
  rid INT NOT NULL,
  name varchar(255) NOT NULL, 
  quantity FLOAT, 
  unit varchar(20),
  PRIMARY KEY(rid, name),
  FOREIGN KEY(rid) REFERENCES recipe(rid)
);
