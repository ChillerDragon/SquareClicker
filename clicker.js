let clicks = 0;
const main = document.getElementById("main");
const score = document.getElementById("score");

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clickSquare() {
    // console.log(event);
    // console.log(event.currentTarget);
    clicks += 1;
    score.innerText = clicks;
    // console.log(getRandomColor());
    main.style.backgroundColor = getRandomColor();
}

main.addEventListener("click", clickSquare);
document.addEventListener("keyup", event => {
    if (event.key === ' ') {
        clickSquare();
    }
});