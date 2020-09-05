const spawn = require("child_process").spawn;
const pythonProcess = spawn('python', ['./src/python/GetWeather.py']);

pythonProcess.stdout.on('data', (data) => console.log(data));

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

setup_welcome();


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
