import requests

import json

# top_250_link = 'https://www.imdb.com/chart/top/'

# from selenium import webdriver
# from selenium.webdriver.common.by import By

# chrome_options = webdriver.ChromeOptions()
# chrome_options.add_experimental_option("detach", True)

# driver = webdriver.Chrome()
# driver.get(top_250_link)

# top_250_list = []

# for i in range(1, 251):
#     top_250_list.append(' '.join(map(str, driver.find_element(By.XPATH, f'/html/body/div[2]/main/div/div[3]/section/div/div[2]/div/ul/li[{i}]/div[2]/div/div/div[1]/a/h3').text.split()[1:])))

# data = {
#             "Films":[
#                 {"Name": name} for name in top_250_list
#             ]
#         }

# with open("data.json", "w") as json_file:
#             json.dump(data, json_file, indent=4)

apikey = 'de584ccb'
omdb_link = f'http://www.omdbapi.com/?apikey={apikey}&'

with open("data.json", "r") as json_file:
    data = json.load(json_file)["Films"]
    film_list = []
    for i in data:
        film_data = requests.get(f'{omdb_link}t={i["Name"]}').json()
        title = film_data['Title']
        year = film_data['Year']
        director = film_data['Director']
        poster = film_data['Poster']
        dict = {'Name': title, 'Year': year, 'Director': director, 'Poster': poster}
        film_list.append(dict)
    
    films_data = {"Films": film_list}
    with open("films_data.json", "w") as json_file:
        json.dump(films_data, json_file, indent=4)