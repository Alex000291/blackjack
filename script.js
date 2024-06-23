var dealersum = 0
var yoursum = 0

var dealerAce = 0
var yourAce = 0

var deck = []
var hidden

var canhit = true;

window.onload = function() {
    builddeck()
    shuffle(deck)
    startgame()
}

function builddeck() {
    values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q']
    types = ['H', 'D', 'S', 'C']
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < types.length; j++) {
            deck.push(values[i] + '-' + types[j])
        }
    }
}


function shuffle(deck) {
    for (var i = 0; i < deck.length; i++) {
        var random = Math.floor(Math.random() * deck.length)
        var temp = deck[i]
        deck[i] = deck[random]
        deck[random] = temp
    }
}

function startgame(){
    hidden = deck.pop()
    dealersum += getvalue(hidden)
    dealerAce += checkAce(hidden)

    console.log('Dealer: ' + hidden)
    console.log('Dealer Sum: ' + dealersum)

    while (dealersum < 17) {
        let img = document.createElement('img')
        let card = deck.pop()
        img.src = 'cards/' + card + '.png'
        dealersum += getvalue(card)
        dealerAce += checkAce(card)
        document.getElementById('dealercards').appendChild(img)
    }
    for(var i=0; i<2; i++){
        let img = document.createElement('img')
        let card = deck.pop()
        img.src = 'cards/' + card + '.png'
        yoursum += getvalue(card)
        yourAce += checkAce(card)
        document.getElementById('yourcards').appendChild(img)
    }

    document.getElementById('hit').addEventListener('click', hit)
    document.getElementById('stand').addEventListener('click', stand)
}


function hit(){
    if(!canhit){
        return
    }
    let img = document.createElement('img')
        let card = deck.pop()
        img.src = 'cards/' + card + '.png'
        yoursum += getvalue(card)
        yourAce += checkAce(card)
        document.getElementById('yourcards').appendChild(img)


        if (reduceAce(yoursum, yourAce) >= 21){
            
            canhit = false
        }
}

function stand(){
    dealersum = reduceAce(dealersum, dealerAce)
    yoursum = reduceAce(yoursum, yourAce)

    canhit = false

    document.getElementById('hidden').src = './cards/' + hidden + '.png';

    let message = ''

    if (yoursum > 21) {
        message = 'You busted!'
    }else if (dealersum > 21){
        message = 'Dealer busted!'
    }else if (yoursum > dealersum){
        message = 'You win!'
    }else if (yoursum < dealersum){
        message = 'You lose!'
    }
    else{
        message = 'Push!'
    }


    document.getElementById('dealersum').innerHTML = 'Dealer: ' + dealersum
    document.getElementById('yoursum').innerHTML = 'You: ' + yoursum


    document.getElementById('results').innerHTML = message
}

function getvalue(card) {
    var value = card.split('-')[0]
    if (value == 'A') {
        return 11
    } else if (value == 'J' || value == 'K' || value == 'Q') {
        return 10
    } else {
        return parseInt(value)
    }
}






function checkAce(card) {
    var value = card.split('-')[0]
    if (value == 'A') {
        return 1
    } else {
        return 0
    }
}


function reduceAce(sum, ace) {
    while (sum > 21 && ace > 0) {
        sum -= 10
        ace--
    }
    return sum
}