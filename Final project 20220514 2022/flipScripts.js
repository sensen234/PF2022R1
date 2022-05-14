const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cards = $$('.cardElements');
const minDisplay = $('.min-display');
const secondDisplay = $('.second-display');
const result = $('.result');

let cardFlipped = false;
let firstCard, secondCard;
let matchedCount = 0;
let lockBoard = false
let Interval;
let imgUrl, msg;
let min, second;
let popup;
let times = 0;

// set random background
$('.cardContainer').style.backgroundImage =
    `url("./img/BG-0${Math.floor((Math.random() * 7) + 1)}.png")`

function flipCard() {
    if (lockBoard) return
    this.classList.add("flip");
    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
    } else {
        cardFlipped = false;
        secondCard = this;

        doTheyMatch();
    }
};

function doTheyMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
        matchedCount++
        blockCards();
    } else {
        unflipCard();
    }
}

function blockCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    setTimeout(hidenElement, 700);
}

function hidenElement() {
    firstCard.style.visibility = "hidden";
    secondCard.style.visibility = "hidden";
}


function unflipCard() {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false
    }, 700);
}

function backTime(selectedTime) {
    times = selectedTime;
    timeOutCal()
}

function timeOutCal() {
    times--;
    min = Math.floor(times / 60);
    second = times % 60
    minDisplay.innerText = min + ' mins';
    secondDisplay.innerText = second + ' seconds';

    if (times > 0 & matchedCount < 6) {
        setTimeout(timeOutCal, 1000);
    } else if (times > 0 & matchedCount === 6) {
       setTimeout(congratsOnWin, 800);
    }
    else {
        sorryOnLose();
    }
}
function congratsOnWin() {
    document.getElementById("winLoseImg").setAttribute("src", "img/win.png");
    document.getElementById("msg").innerText = 'Congratulation! You won!';
    result.classList.add('fadeIn');
}

function sorryOnLose() {
    document.getElementById("winLoseImg").setAttribute("src", "img/lose.png");
    document.getElementById("msg").innerText = 'Time out!';
    result.classList.add('fadeIn');
}

(function shuffle() {
    cards.forEach(card => {
        let randomOrder = Math.floor(Math.random() * 12);
        card.style.order = randomOrder;
    })
}());

cards.forEach(card => card.addEventListener("click", flipCard))

function playgame() {
    location.reload();
    result.classList.remove('fadeIn');
}