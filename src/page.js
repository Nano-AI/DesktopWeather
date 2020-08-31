const puppeteer = require('puppeteer');

async function getWeather(){
    const browser = await puppeteer.launch({ headless: true}); // for test disable the headlels mode,
    const page = await browser.newPage();
    // await page.setViewport({ width: 1000, height: 926 });
    await page.goto("https://www.google.com/search?&q=what+is+the+weather",{waitUntil: 'networkidle2'});
    /** @type {string[]} */
    var items = await page.evaluate(()=>{
        return document.getElementById("wob_tm")
    })

    console.log(productNames)
    browser.close()
} 

function test() {
    document.getElementById('weather').innerHTML = "test";
}

test();

// getWeather()

var time = new Date().getHours();

if (time < 12) {
    document.getElementById('good-x').innerHTML = "Good morning!";
} else if (time < 18) {
    document.getElementById('good-x').innerHTML = "Good afternoon!";
} else {
    document.getElementById('good-x').innerHTML = "Good evening!";
}


window.setInterval(() => {
    const divider = ':';
    var date = new Date();
    document.getElementById('time').innerHTML = `${date.getHours()}${divider}${date.getMinutes()}${divider}${date.getSeconds()}`
}, 1000)

const userAction = async() => {
    const response = await fetch('https://api.quotable.io/random');
    const json = await response.json();
    document.getElementById('quote').innerHTML = `${json.content}<br>- ${json.author}`;
}

userAction();