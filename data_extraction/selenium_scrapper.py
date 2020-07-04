from selenium import webdriver
import time

# Put the path for your ChromeDriver here
# download the driver at https://chromedriver.storage.googleapis.com/index.html?path=83.0.4103.39/
DRIVER_PATH = "./chromedriver.exe"
wd = webdriver.Chrome(executable_path=DRIVER_PATH)
wd.get('https://google.com')

# code from https://towardsdatascience.com/image-scraping-with-python-a96feda8af2d
# slight modifications explained in the comments
def fetch_image_urls(query:str, wd:webdriver, sleep_between_interactions:int=0): 
    # removed parameter max_links_to_fetch:int since we only want one
    def scroll_to_end(wd):
        wd.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(sleep_between_interactions)    
    
    # build the google query
    search_url = "https://www.google.com/search?safe=off&site=&tbm=isch&source=hp&q={q}&oq={q}&gs_l=img"

    # load the page
    wd.get(search_url.format(q=query))

    image_url = None
    image_found = False
    #image_count = 0
    results_start = 0
    # remove the while loop to prevent infinite search
    #while image_count < max_links_to_fetch:
    scroll_to_end(wd)

    # get all image thumbnail results
    thumbnail_results = wd.find_elements_by_css_selector("img.Q4LuWd")
    number_results = len(thumbnail_results)
    
    print(f"Found: {number_results} search results. Extracting links from {results_start}:{number_results}")
    
    for img in thumbnail_results[results_start:number_results]:
        # try to click every thumbnail such that we can get the real image behind it
        try:
            img.click()
            time.sleep(sleep_between_interactions)
        except Exception:
            continue

        # extract image urls    
        actual_images = wd.find_elements_by_css_selector('img.n3VNCb')
        for actual_image in actual_images:
            if actual_image.get_attribute('src') and 'http' in actual_image.get_attribute('src'):
                # filter for png and jpg only
                if actual_image.get_attribute('src')[-4:] == ".png" or actual_image.get_attribute('src')[-4:] == ".jpg":
                    image_url = actual_image.get_attribute('src')
                    image_found = True
                    # we only want one
                    break
        if image_found:
            # we only want one image
            break

    '''if len(image_urls) >= max_links_to_fetch:
        print(f"Found: {len(image_urls)} image links, done!")
        break
    else:
        print("Found:", len(image_urls), "image links, looking for more ...")
        #time.sleep(30)
        return
        load_more_button = wd.find_element_by_css_selector(".mye4qd")
        if load_more_button:
            wd.execute_script("document.querySelector('.mye4qd').click();")'''

    # move the result startpoint further down
    #results_start = len(thumbnail_results)

    return image_url


# search for images based on cleaned table
import pandas
recipe_data = pandas.read_csv("recipes.csv")
imageUrls= []
for r in recipe_data.recipeName.items():
    imageUrls.append(fetch_image_urls(r[1].replace('\s+', ' '), wd))
recipe_data['imageUrl'] = imageUrls
recipe_data.to_csv("recipes_with_images.csv", index=False)
wd.quit()