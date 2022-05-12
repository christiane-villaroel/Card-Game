let deckId
let computer = 0
let player = 0
let h2 = document.getElementById("winner") 
let h3 = document.getElementById("remaining-cards")
const drawCardBTN = document.getElementById("draw-cards")
const scoresHTML = document.getElementById("score-count")
const cardsContainer =  document.getElementById("cards-container")
const computerScoreEl= document.getElementById("computer")
const playerScoreEl= document.getElementById("player")
const computerCards= document.getElementById("computer-card-slot")
const playerCards = document.getElementById("player-card-slot")


function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            h3.style.color = "white"
            deckId = data.deck_id
        })

}

document.getElementById("new-deck").addEventListener("click", handleClick)

drawCardBTN.addEventListener("click", () => {
    let drawnCards =""
    let playersCards
   
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data =>{
            if(data.remaining === 0){
                 drawCardBTN.disabled= true
                 drawCardBTN.classList.add("disabled")
                 drawCardBTN.innerText = "No More Cards to Draw"
            }
            
            h3.innerText = `${data.remaining} Cards Remaining`
            
            playersCards = data.cards.map(card =>{
              return card.value
           }) 
          h2.innerText = determineCardWinner(playersCards[0],playersCards[1]) 
          drawnCards =  data.cards.map(card => `<img src="${card.images.png}" class="cards">`)
         computerCards.innerHTML = drawnCards[0] 
         playerCards.innerHTML = drawnCards[1]      
          })                                                                         
})

/**
 * Challenge:
 * 
 * Disable the Draw button when we have no more cards to draw from
 * in the deck.
 * 
 * Disable both the functionality of the button (i.e. change
 * `disabled` to true on the button) AND the styling (i.e. add
 * a `disabled` CSS class to make it look unclickable)
 */

function determineCardWinner(card1, card2){
let cardValues = ["1","2","3","4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
const card1Value = cardValues.indexOf(card1)
const card2Value = cardValues.indexOf(card2)



if (card1Value > card2Value){
    computer ++
    document.getElementById("computer-score").innerText = `Computer Score: ${computer}`     
    return "Computer wins"
}else if(card2Value > card1Value){
   player ++
   document.getElementById("player-score").innerText = `Player Score: ${player}` 
   return "Player wins"
}else{
    return "Its a tie!"
}   

}
