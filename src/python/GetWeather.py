from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import quote
import pickle
import os
import sys


def weather_setup():
    global driver, url
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    try:
        data = pickle.load(open('data.p', 'rb'))
    except EOFError:
        data = {'driver-dir': None}
    url = "https://www.google.com/search?q=what+is+the+weather+right+now"
    if data['driver-dir'] == None:
        print("Didn't find Chrome driver... Installing...")
        data['driver-dir'] = ChromeDriverManager().install()
        print("Chrome Driver installed at " + data['driver-dir'])
    else:
        print("Chrome Driver found in data.p")
    print('Running Driver')
    driver = webdriver.Chrome(data['driver-dir'], chrome_options=options)
    pickle.dump(data, open('data.p', 'wb'))

def get_weather_text() -> list:
    driver.get(url)
    weather = driver.find_elements_by_id("wob_tm")
    location = driver.find_elements_by_id('wob_loc')
    return_weather_arr = []
    for post in weather:
        return_weather_arr.append(post.text)
    return_location_arr = []
    for post in location:
        return_location_arr.append(post.text)
    if len(return_weather_arr) != 0:
        return [str(return_weather_arr[0]) + u'\xb0' + 'F',
                return_location_arr[0]]
    return ["Unknown", "Unknown"]

weather_setup()
print(get_weather_text())
sys.stdout.flush()
