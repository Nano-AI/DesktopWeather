const puppeteer = require('puppeteer');

async function getWeather(){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.onepeloton.com/', { waitUntil: 'domcontentloaded' });
    await page.exposeFunction('urlExists', urlExists);

    const img = await page.evaluate(async () => {
        const ogImg = document.querySelector('meta[property="og:image"]');
        if (ogImg != null && ogImg.content.length > 0) {
            const isExists = await urlExists(ogImg.content);
            return isExists;
        }
    });
    console.log(img);

    await browser.close()
}

getWeather();

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

// test();
