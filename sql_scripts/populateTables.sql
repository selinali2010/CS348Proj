-- Populate recipe Table
INSERT INTO recipe (name, cookTime, difficulty, cuisine, servings, image, url, author) 
VALUES("Apple Pie", 30, 4, "pastry", 8, "randomImageUrl", "www.google.com", "Rob Nadal");
INSERT INTO recipe (name, cookTime, difficulty, cuisine, servings, image, url, author) 
VALUES("Cheesecake", 45, 3, "cake", 10, "cheesecakeUrl", "www.google.com", "Hemit Shah");
INSERT INTO recipe (name, cookTime, difficulty, cuisine, servings, image, url, author) 
VALUES("Banana Bread", 50, 1, "bread", 6, "bananaBreadUrl", "www.google.com", "Selina Li");
INSERT INTO recipe (name, cookTime, difficulty, cuisine, servings, image, url, author) 
VALUES("Bubble Tea", 60, 5, "drink", 4, "bubbleTeaUrl", "www.google.com", "Linda Zheng");

-- Populate ingredient Table
INSERT INTO ingredient VALUES(3, "banana", 3, NULL);
INSERT INTO ingredient VALUES(3, "butter", 0.33, "cup");
INSERT INTO ingredient VALUES(3, "baking soda", 1, "tsp");
INSERT INTO ingredient VALUES(3, "sugar", 0.75, "cup");
INSERT INTO ingredient VALUES(1, "apple", 4, NULL);
INSERT INTO ingredient VALUES(1, "brown sugar", 0.5, "cup");
INSERT INTO ingredient VALUES(1, "cinnamon", 0.25, "tsp");
INSERT INTO ingredient VALUES(1, "white sugar", 0.25, "cup");