// https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
// https://apis.scrimba.com/deckofcards/api/deck/<deck id>/draw/?count=2

// INIT
const shuffleDeckBtn = document.getElementById('shuffle-deck')
const remainingCards = document.getElementById('remaining-cards')
const cardWinner = document.getElementById('card-winner')
const houseScore = document.getElementById('house-score')
const cardSlotContainer = document.getElementById('card-slot-container')
const myScore = document.getElementById('my-score')
const drawNewCards = document.getElementById('draw-cards')
const restartGameBtn = document.getElementById('restart-game')
let deckId = ''
let houseScoreCount = 0
let myScoreCount = 0

// SHUFFLE DECK BUTTON EVENTLISTENER
shuffleDeckBtn.addEventListener('click', shuffleDeckClick)
// DRAW NEW CARDS BUTTON EVENTLISTENER
drawNewCards.addEventListener('click', drawCards)
// RESTART GAME BUTTON EVENTLISTENER
restartGameBtn.addEventListener('click', restartGame)


// FUNCTION TO RESTART GAME
function restartGame(){
    location.reload()
}
// FUNCTION TO SHUFFLE DECKS
function shuffleDeckClick(){
    fetch(' https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/', {method: "GET"})
        .then(response => response.json())
        .then(data => {
            remainingCards.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
            eneableDrawCardsBtn()
        })
}

// FUNCTION TO ENABLE DRAW CARDS BUTTON WHEN DECK HAS BEEN SHUFFLED
function eneableDrawCardsBtn(){
    drawNewCards.disabled = false
    restartGameBtn.disabled = false
}

function disableBtn() {
    drawNewCards.disabled = true
    shuffleDeckBtn.disabled = true
}


// FUNCTION TO DRAW NEW CARDS
function drawCards(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            remainingCards.textContent = `Remaining cards: ${data.remaining}`
            let htmlStr = ""
            data.cards.map(function(cards){
                htmlStr += `<img class="card-img" src="${cards.image}" alt="${cards.value} ${cards.suit}">`
            })
            cardSlotContainer.innerHTML = htmlStr
            let winner = determineWinner(data.cards[0].value, data.cards[1].value)
            cardWinner.innerHTML = winner

            // DISABLE BTN WHEN REMAINING CARDS IS ZERO
            if(data.remaining === 0){
                disableBtn()
                if(houseScoreCount > myScoreCount){
                    cardWinner.textContent = `You lost the game`
                } else if(houseScoreCount < myScoreCount) {
                    cardWinner.textContent = `You won the game`
                } else {
                    cardWinner.textContent = `It's a tie game`
                }
            }
        })
}



// FUNCTION TO ASSIGN VALUES TO JACK, QUEEN, KING AND ACE CARDS
function assignValuesToCards(card){
    if(card === 'JACK') {
        return 11
    } else if(card === 'QUEEN'){
        return 12
    } else if(card === 'KING'){
        return 13
    } else if(card === 'ACE') {
        return 14
    } else {
        return parseInt(card)
    }
}

// FUNCTION TO DETERMINE WINNER
function determineWinner(card1, card2){
    let card1Value = assignValuesToCards(card1)
    let card2Value = assignValuesToCards(card2)
    if(card1Value > card2Value) {
        houseScoreCount++
        houseScore.textContent = `House score: ${houseScoreCount}`
        return cardWinner.textContent = `You lose`
    } else if(card1Value < card2Value) {
        myScoreCount++
        myScore.textContent = `Your score: ${myScoreCount}`
        return cardWinner.textContent = `You win`
    } else {
        return cardWinner.textContent = `WAR`
    }
}











