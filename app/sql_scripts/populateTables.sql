-- Populate recipe Table
INSERT INTO recipe (recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName) 
VALUES("Apple Pie", 30, 4, "Pastry", 8, "https://cdn-image.foodandwine.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/200411-xl-lattice-apple-pie.jpg", "www.google.com", "Rob Nadal");
INSERT INTO recipe (recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName) 
VALUES("Cheesecake", 45, 3, "Cake", 10, "https://www.seriouseats.com/recipes/images/2017/06/20170526-no-bake-cheesecake-vicky-wasik-18-1500x1125.jpg", "www.google.com", "Hemit Shah");
INSERT INTO recipe (recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName) 
VALUES("Banana Bread", 50, 1, "Bread", 6, "https://www.seriouseats.com/images/2016/09/20160826-banana-bread-vicky-wasik-15.jpg", "www.google.com", "Selina Li");
INSERT INTO recipe (recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName) 
VALUES("Bubble Tea", 60, 5, "Drink", 4, "http://blog.lollicupstore.com/wp-content/uploads/2018/03/what-is-boba-main.jpeg", "www.google.com", "Linda Zheng");
INSERT INTO recipe (recipeName, cookTime, difficulty, cuisine, servings, imageUrl, instructionsLink, authorName) 
VALUES("Paella", 45, 3, "Spanish", 4, "https://blog.fuertehoteles.com/wp-content/uploads/2014/03/paella-2-compressor.jpg", "www.google.com", "Ethan Guo");

-- Populate user Table
INSERT INTO user(userName, password) VALUES("user1", "password");
INSERT INTO user(userName, password) VALUES("user2", "password");
INSERT INTO user(userName, password) VALUES("user3", "password");
INSERT INTO user(userName, password) VALUES("user4", "password");
INSERT INTO user(userName, password) VALUES("user5", "password");
INSERT INTO user(userName, password) VALUES("user6", "password");

-- Populate ingredient Table
INSERT INTO ingredient VALUES(3, "banana", 3, NULL);
INSERT INTO ingredient VALUES(3, "butter", 0.33, "cup");
INSERT INTO ingredient VALUES(3, "baking soda", 1, "tsp");
INSERT INTO ingredient VALUES(3, "sugar", 0.75, "cup");
INSERT INTO ingredient VALUES(1, "apple", 4, NULL);
INSERT INTO ingredient VALUES(1, "brown sugar", 0.5, "cup");
INSERT INTO ingredient VALUES(1, "cinnamon", 0.25, "tsp");
INSERT INTO ingredient VALUES(1, "white sugar", 0.25, "cup");
INSERT INTO ingredient VALUES(2, "margerine", 12.5, "mL");
INSERT INTO ingredient VALUES(2, "cream cheese", 100, "mL");
INSERT INTO ingredient VALUES(2, "vanilla extract", 1, "tsp");
INSERT INTO ingredient VALUES(4, "tapioca", 20, NULL);
INSERT INTO ingredient VALUES(4, "milk", 1.5, "cup");
INSERT INTO ingredient VALUES(4, "mango", 1, NULL);
INSERT INTO ingredient VALUES(5, "rice", 1, "cup");
INSERT INTO ingredient VALUES(5, "butter", 20, "mL");
INSERT INTO ingredient VALUES(5, "shrimp", 10, NULL);

-- Populate reacts Table
INSERT INTO reacts VALUES(1, 1, 1);
INSERT INTO reacts VALUES(2, 1, 5);
INSERT INTO reacts VALUES(6, 3, 5);
INSERT INTO reacts VALUES(4, 2, 4);
INSERT INTO reacts VALUES(3, 4, 3);
INSERT INTO reacts VALUES(5, 3, 6);
INSERT INTO reacts VALUES(3, 2, 3);
INSERT INTO reacts VALUES(1, 2, 1);
INSERT INTO reacts VALUES(1, 3, 1);
INSERT INTO reacts VALUES(1, 4, 1);
INSERT INTO reacts VALUES(1, 5, 1);
INSERT INTO reacts VALUES(2, 5, 1);
INSERT INTO reacts VALUES(3, 5, 1);
INSERT INTO reacts VALUES(4, 5, 1);

-- Populate substitutes Table
INSERT INTO substitutes VALUES(1, "brown sugar", "white sugar");
INSERT INTO substitutes VALUES(3, "sugar", "white sugar");
INSERT INTO substitutes VALUES(3, "sugar", "brown sugar");
INSERT INTO substitutes VALUES(3, "butter", "margerine");
INSERT INTO substitutes VALUES(2, "margerine", "butter");
INSERT INTO substitutes VALUES(4, "mango", "taro");
INSERT INTO substitutes VALUES(4, "mango", "matcha powder");
INSERT INTO substitutes VALUES(5, "shrimp", "chicken");

-- Populate tags Table
INSERT INTO tags VALUES(1, "lactose free");
INSERT INTO tags VALUES(1, "nut free");
INSERT INTO tags VALUES(1, "vegetarian");
INSERT INTO tags VALUES(2, "nut free");
INSERT INTO tags VALUES(3, "nut free");
INSERT INTO tags VALUES(4, "drink");
INSERT INTO tags VALUES(4, "hot");
INSERT INTO tags VALUES(4, "cold");
INSERT INTO tags VALUES(5, "seafood");
INSERT INTO tags VALUES(5, "fresh");
INSERT INTO tags VALUES(5, "nut free");
