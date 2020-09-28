from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import quote
import pickle
import os
import sys
import logging

ids = ["wob_tm", "wob_loc", "wob_dts", "wob_dc", "wob_tci"]

def weather_setup():
    global driver, url
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    try:
        data = pickle.load(open('src/data/data.p', 'rb'))
    except EOFError:
        data = {'driver-dir': None}
    except FileNotFoundError:
        open("src/data/data.p", "a")
        data = pickle.load(open('src/data/data.p', 'rb'))
    url = "https://www.google.com/search?q=what+is+the+weather+right+now"
    if data['driver-dir'] == None:
        data['driver-dir'] = ChromeDriverManager(print_first_line = False).install()
    else:
        pass
    driver = webdriver.Chrome(data['driver-dir'], options=options)
    pickle.dump(data, open('src/data/data.p', 'wb'))

def get_weather_text() -> list:
    driver.get(url)
    return_arr = []
    for e_id in ids:
        element = driver.find_element_by_id(e_id)
        if e_id == "wob_tci":
            return_arr.append(str(element.get_attribute("src")))
        else:
            return_arr.append(str(element.text))
    if len(return_arr) != 0:
        return return_arr
    return ["Unknown"] * 100

weather_setup()
data = get_weather_text()
# print(data.join("\n"))
print("\n".join(data))
sys.stdout.flush()
quit()
