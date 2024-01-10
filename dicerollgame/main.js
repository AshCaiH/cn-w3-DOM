/* Requirements

Dice button
Hold button
Score display
"Playmat"

*/

const pips = [
    "    x    ",
    "x       x",
    "x   x   x",
    "x x   x x",
    "x x x x x",
    "xxx   xxx",
]

let playerScore = null;
let playmat = null;

let gameEnded = null;

const initialise = () => {
    gameEnded = false;

    playmat = {    
        object: document.getElementsByClassName("playmat")[0].cloneNode(true),
        score: 0,
        scoreDisplay: null
    }
    
    playmat.dice = {
        object: playmat.object.getElementsByClassName("dice")[0]
    }
    playmat.dice.face = playmat.dice.object.getElementsByClassName("diceFace")[0];
    playmat.scoreDisplay = playmat.object.getElementsByClassName("score")[0];

    playmat.dice.face.pips = playmat.dice.face.getElementsByClassName("pip");

    playmat.dice.object.classList.remove("lost");
}

const diceRoll = () => {
    if (gameEnded) return;
    // Generate number
    // If number == 1: lose
    // Add to score
    // If score > 20: win
    let rollScore = Math.ceil( Math.random() * 6 );
    playmat.dice.face.textContent = rollScore;
    playmat.score += rollScore;    

    if (rollScore == 1) {
        gameEnded = true;
        playmat.dice.object.classList.add("lost");
        return;
    }

    playmat.scoreDisplay.textContent = playmat.score;
    if (playmat.score >= 20) gameEnded = true;
}

const setPips = (dice) => {
    
}

initialise();

document.getElementById("container").appendChild(playmat.object);

playmat.dice.object.addEventListener("click", diceRoll);