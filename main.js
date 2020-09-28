const spawn = require("child_process").spawn;
const Quote = require('inspirational-quotes');
const fs = require('fs');

var pythonProcess = spawn('python', ['GetWeather.py']); 

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

pythonProcess.stdout.on('data', (data) => {
    var output = new TextDecoder().decode(data).split("\n");
    document.getElementById("weather").innerHTML = `
        <img src="${output[4]}" style='vertical-align:middle;' />
        <div style='vertical-align:middle; display:inline;'>
            ${output[0]}&#730;F
        </div>
        <br>
        <p style="font-size: 1.5rem">${output[1]}</p>
    `;
});

setup_welcome();

var img_count = 0;

const config = require("./settings.json");
ChangeBackground();

function ChangeBackground() {
    var files = fs.readdirSync('./images');
    if (img_count >= files.length - 1) {
        img_count = 0;
    } else {
        img_count ++;
    }
    document.getElementById('background').style.backgroundImage = `url(./images/${files[img_count]})`;
}

window.setInterval(() => {
    var pythonProcess = spawn('python', ['GetWeather.py']);
        
    pythonProcess.stdout.on('data', (data) => {
        var output = new TextDecoder().decode(data);
        console.log(output);
    });
}, config['weather-interval'] * 1000);

window.setInterval(() => {
    ChangeBackground();
}, config['image-interval'] * 1000);

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
    document.getElementById('quote').innerHTML = `${rand_quote['text']}<br>- ${rand_quote['author']}`;
}

userAction();
