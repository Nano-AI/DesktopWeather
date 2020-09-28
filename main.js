const spawn = require("child_process").spawn;
const Quote = require('inspirational-quotes');
const fs = require('fs'); 
const path = require('path');

const css_dir = path.join(__dirname, './styles.css');

var link = document.createElement('link')
link.setAttribute('rel', 'stylesheet')
link.setAttribute('href', css_dir)
document.head.appendChild(link);

const files = {
    "images": path.join(__dirname, 'images'),
    "settings": path.join(__dirname, 'settings.json')
};

function setup_welcome() {
    var time = new Date().getHours();
    if (time < 12) {
        document.getElementById('good-x').innerHTML = "Good morning!";
    } else if (time < 18) {
        document.getElementById('good-x').innerHTML = "Good afternoon!";
    } else {
        document.getElementById('good-x').innerHTML = "Good evening!";
    }
}

function WeatherUpdate() {
    const puppeteer = require('puppeteer');
    puppeteer
        .launch()
        .then(browser => (_browser = browser))
        .then(browser => (_page = browser.newPage()))
        .then(page => page.goto('https://www.google.com/search?q=what+is+the+weather'))
        .then(() => _page)
        .then(page => {
            var output = page.evaluate(() => {
                var elements = {};
                var elm_ids = ["wob_loc", "wob_tci", "wob_tm", "wob_dc"];
                for (var i = 0; i < elm_ids.length; i++) {
                    switch (elm_ids[i]) {
                        case "wob_tci":
                            elements[elm_ids[i]] = document.getElementById(elm_ids[i]).src;
                            break;
                        default:
                            elements[elm_ids[i]] = document.getElementById(elm_ids[i]).innerHTML;
                            break;
                    }
                }
                return elements;
            });
            return output;
        })
        .then((output) => {
            _browser.close();
            console.log(output)
            document.getElementById("weather").innerHTML = `
                <img src="${output["wob_tci"]}" style='vertical-align:middle;' />
                <div style='vertical-align:middle; display:inline;'>
                    ${output["wob_tm"]}&#730;F
                </div>
                <br>
                <p style="font-size: 1.5rem">${output["wob_loc"]}</p>
            `;
        });
}

WeatherUpdate();
setup_welcome();

var img_count = 0;

const config = require(files['settings']);
ChangeBackground();

function ChangeBackground() {
    var img_files = fs.readdirSync(files['images'] + '/');
    if (img_count >= files.length - 1) {
        img_count = 0;
    } else {
        img_count ++;
    }
    document.getElementById('background').style.backgroundImage = `url(images/${img_files[img_count]})`;
}

window.setInterval(() => {
    WeatherUpdate()
}, config['weather-interval'] * 1000);

window.setInterval(() => {
    ChangeBackground();
}, config['image-interval'] * 1000);

window.setInterval(() => {
    setup_welcome();
});

window.setInterval(() => {
    const divider = ':';
    var date = new Date();
    document.getElementById('time').innerHTML = `${date.getHours()}${divider}${date.getMinutes()}${divider}${date.getSeconds()}`
}, 1000);

const userAction = async() => {
    // const response = await fetch('https://api.quotable.io/random');
    // const json = await response.json();
    // document.getElementById('quote').innerHTML = `${json.content}<br>- ${json.author}`;
    var rand_quote = Quote.getQuote();
    if (rand_quote['author'] != undefined || rand_quote['author'] != "")
        document.getElementById('quote').innerHTML = `${rand_quote['text']}<br>- ${rand_quote['author']}`;
    else document.getElementById('quote').innerHTML = `${rand_quote['text']}<br>`;
}

userAction();
