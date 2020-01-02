/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, beforeDice;

init();

//modifica HTML prin Selector - trimite dispre JS catre HTML
//document.querySelector('#current-' + activePlayer).textContent = dice ; //to put inside HTML

//modifica HTML prin Selector - trimite dispre JS catre HTML- cu text de HTML
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// preia date din HTML si o sctocheaza intr-o variabila din JS
//var x = document.querySelector('#score-0').textContent; //to get from HTML

//asteapta triggerul adica click pe butonul btn-roll
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById('dice-1').style.display = "block";
        document.getElementById('dice-2').style.display = "block";
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // if(dice1 === 6 && beforeDice === 6) {
        //     scores[activePlayer] = 0;
        //     console.log('a dat dubla' + scores)
        //     document.querySelector('#score-' + activePlayer).textContent = '0'; 
        //     nextPlayer ();
        // }
        // else { 
        
        // beforeDice = dice;
        

        // 3. Update the round score IF the rolled number was Not a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore = roundScore + dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer ();
        }

        }

    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // add curent score to global score
        scores[activePlayer] += roundScore;

        //uptate de UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        // Undefined, 0, null, or "" are COERCED to false
        if (input) {
            var winningScore = input;
        } else {
            winningScore = 100;
        }

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-'+ activePlayer).textContent = 'WINNER !'; 
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            //next player
            nextPlayer ();
        }
            // //reseteaza curent
            // document.getElementById('current-0').textContent = '0';
            // document.getElementById('current-1').textContent = '0';
    }
});

function nextPlayer () {
    //Next player
        // if (activePlayer = 0) { activePlayer = 1;}
        // else {activePlayer = 0}
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //sterge o specificatie a clasei din interiorul html-ului.
        //document.querySelector('.player-0-panel').classList.remove('active');

        //adauga o specificatie a clasei din interiorul html-ului.
        //document.querySelector('.player-1-panel').classList.add('active');

        // SCHIMBAM add sau remove - cu toggle - va schimba starea in functie de cum este.
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.getElementById('dice-1').style.display = "none";
        document.getElementById('dice-2').style.display = "none";
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    beforeDice = 0;

    //modifica CSS - trimite dispre JS catre CSS
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";

    //modifica HTML prin ID - trimite dispre JS catre HTML
    document.getElementById('score-0').textContent = '0'; 
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}