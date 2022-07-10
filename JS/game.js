// esse arquivo contém toda a lógica do jogo, se o jogo acabou...se você encontrou o par igual, etc.

let game = {


    lockMode: false,
    firstCard: null,
    secondCard: null,


    heroes: [
        'captainAmerica',
        'daredevil',
        'deadpool',
        'groot',
        'hulk',
        'ironMan',
        'nickFury',
        'spiderMan',
        'thor',
        'wolwerine',
    ],

    cards: null,


    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0]

        if (card.flipped || this.lockMode) {
            return false
        }

        if (!this.firstCard) {
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        } else {
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }

    },

    

    checkMatch: function () {

        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function () {

        this.firstCard = null
        this.secondCard = null
        this.lockMode = false

    },

    unFlipCards: function () {
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver: function () {

        return this.cards.filter(card => !card.flipped).length == 0

    },

    // aqui é a criação de cada card
    createCardsFromTechs: function () {

        this.cards = []

        this.heroes.forEach((heroe) => {
            this.cards.push(this.createPairFromTech(heroe))
        })

        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()
        return this.cards

    },

    // criação de cada par de cards
    createPairFromTech: function (heroe) {
        return [
            {
                id: this.createIdForTech(heroe),
                icon: heroe,
                flipped: false,

            }, {

                id: this.createIdForTech(heroe),
                icon: heroe,
                flipped: false,

            }
        ]
    },


    // como uso de ids para diferenciar cada card de um mesmo par, esse método é a responsável por gerar esses ids
    createIdForTech: function (heroe) {
        return heroe + parseInt(Math.random() * 1000)
    },


    // esse método embaralha todas os cards
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length
        let randomIndex = 0

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]

        }
    }

}