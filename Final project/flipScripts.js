const cards = document.querySelectorAll('.cardElements');

function flipCard() {
    console.log('clicked');
};

//cards.forEach(function(card){
//    card.addEventlistener('click', flipCard
// })
cards.forEach(card => card.addEventListener('click', flipCard));