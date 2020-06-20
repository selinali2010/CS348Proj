import random
image_set = ['https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg',
'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg', 
'https://www.sciencemag.org/sites/default/files/styles/article_main_image_-_1280w__no_aspect_/public/dogs_1280p_0.jpg?itok=6jQzdNB8', 
'https://www.sciencealert.com/images/2020-03/processed/010-pomeranian_1024.jpg',
'https://images2.minutemediacdn.com/image/upload/c_crop,h_1188,w_2121,x_0,y_142/f_auto,q_auto,w_1100/v1554733134/shape/mentalfloss/78996-istock-682216682.jpg']
link_set = ['www.google.ca']
cuisine_set = ['Fast food', 'American', 'Indian', 'Chinese', 'Middle Eastern', 'Mexican', 'Italian', 'French', 'Japanese', 'Eastern European', 'Mediterranean', 'Greek']
author_set = ['Rob Nadal', 'Selina Li', 'Hemit Shah', 'Ethan Guo', 'Linda Zheng', 
'Hannah Li', 'Frank Wu', 'Jackie Chen', 'Thomas Cheng', 'Jerry Yu', 'Sara Hosseini', 'Grace Geng'
'Victor Liao', 'Mark Zhang', 'Mira Yadav', 'Alex C.', 'Alex B.', 'David Lu', 'Ahmed El Shatshat',
'Cindy Wang', 'Jacky Liao', 'Serena Hacker', 'Ellen Sun', 'Juliana Zadarko', 'Peggy Li', 'Chandana Satish',
'Michael Qin', 'Alan Ma', 'David Gu', 'Kara Dietz', 'Angela Dietz', 'Michael Jiang', 'Rushi Ghandi', 
'Mufeez Amjad', 'Hrithvik Alex', 'Cosmo Zhao', 'Bob Su']

f = open('recipes.txt', 'w+') 
for i in range(25):
    recipeId = i
    recipeName = "recipe"+str(i)
    cookTime = random.randint(1,75)
    difficulty = random.randint(1,5)
    cuisine = cuisine_set[random.randint(0,len(cuisine_set)-1)]
    servings = random.randint(1,16)
    imageURL = image_set[random.randint(0,len(image_set)-1)]
    instructionsLink = link_set[random.randint(0,len(link_set)-1)]
    authorName = author_set[random.randint(0,len(author_set)-1)]
    f.write('\t'.join(map(str,[recipeId, recipeName, cookTime, difficulty, cuisine, servings, imageURL, instructionsLink, authorName]))+"\n")
