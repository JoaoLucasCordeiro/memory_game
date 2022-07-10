//toda intereção do usuário está presente nesse arquivo


// constantes que utilizei

const FRONT = 'card-front'
const BACK = 'card-back'
const CARD = 'card'
const ICON = 'icon'


// função de inicialização do game
startGame()

function startGame() {

    initializeCards(game.createCardsFromTechs())
}

// função para jogar os cards no game board
function initializeCards(cards) {

    let gameBoard = document.getElementById('game-board')
    gameBoard.innerHTML = ''

    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)


        cardElement.addEventListener('click', flipCard)
       
        gameBoard.appendChild(cardElement)

    })

}

// criação do conteúdo de cada card
function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)

}

// criação do conteúdo de cada card 2
function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = './images/' + card.icon + '.png'
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = ' <img src="./icon/logoMarvel.png" alt="logo-back-marvel" width="75px">'
    }
    element.appendChild(cardElementFace)

}

// função que faz a animação de flip acontecer em cada card
function flipCard() {

    if (game.setCard(this.id)) {
        startTimer()
        this.classList.add('flip')
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                // checando se o jogo finalizou para a tela de game over aparecer
                if (game.checkGameOver()) {
                    let gameOverScreen = document.getElementById('game-over')
                    gameOverScreen.style.display = 'flex'
                    stopTimer()
                }
            } else {

                //setando 1 segundo de timeout para as cartas virarem após o clique
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)


                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unFlipCards()
                }, 1000)

            }
        }


    }

}

// função para reinicar o jogo
function restartGame() {
    game.clearCards()
    startGame()
    let gameOverScreen = document.getElementById('game-over')
    gameOverScreen.style.display = 'none'
}

// timer do jogo

let buttonRestart = document.getElementById('btn-restart')
let timerScreen = document.getElementById('stopWatch')

let seconds = 0
let interval = null

// event listeners

buttonRestart.addEventListener('click', () => {
    restartGame()
    resetTimer()
})

function timer() {
    
    seconds++

    let mins = Math.floor(seconds / 60)
    let secs = seconds % 60

    if (mins < 10) mins = '0' + mins
    if (secs < 10) secs = '0' + secs
    
    timerScreen.innerText = `${mins}:${secs}`
}

function startTimer() {

    if(interval){
        return
    }

    interval = setInterval(timer, 1000)
}

function stopTimer() {
    clearInterval(interval)
    interval = null
}

function resetTimer() {
    stopTimer()
    seconds = 0
    timerScreen.innerText = '00:00'
}

