function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// create dom stuff
const main = document.getElementById("main");
const score = document.getElementById("score");
const speed = document.getElementById("speed");

// setup / load data
const cookie_clicks = getCookie("clicks");
let clicks = cookie_clicks === '' ? 0 : Number.parseInt(cookie_clicks, 10);
score.innerText = clicks;

const cookie_speed = getCookie("speed");
let top_diff = cookie_speed === '' ? 0 : Number.parseInt(cookie_speed, 10);
speed.innerText = top_diff;
let last_clicks = clicks;

function saveGame() {
    setCookie("clicks", clicks, 420);
    setCookie("speed", top_diff, 420);
}

function calcSpeed() {
    // console.log("lastclicks: " + last_clicks);
    if (last_clicks) {
        let diff = clicks - last_clicks;
        // console.log("diff: " + diff + " best: " + top_diff);
        if (diff > top_diff) {
            top_diff = diff;
            speed.innerText = top_diff;
            // console.log("new highscore")
        }
    }
    last_clicks = clicks;
}

function gameTick() {
    console.log("gametick");
    calcSpeed();
    saveGame();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clickSquare() {
    clicks += 1;
    score.innerText = clicks;
    main.style.backgroundColor = getRandomColor();
}

main.addEventListener("click", clickSquare);
document.addEventListener("keyup", event => {
    if (event.key === ' ') {
        clickSquare();
    }
});

setInterval(function(){ gameTick(); }, 10000);