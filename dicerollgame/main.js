/* Requirements

Dice button
Hold button
Score display
"Playmat"

*/

const pipStrings = [
    "    x    ",
    "x       x",
    "x   x   x",
    "x x   x x",
    "x x x x x",
    "x xx xx x",
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

    playmat.dice.pips = playmat.dice.face.getElementsByClassName("pip");

    for (p of playmat.dice.pips) console.log(p);

    playmat.dice.object.classList.remove("lost");
    playmat.scoreDisplay.textContent = playmat.score;
}

const diceRoll = () => {
    
    playmat.dice.object.style.position = "2px";

    if (gameEnded) return;
    let rollScore = Math.ceil( Math.random() * 6 );

    console.log(rollScore);

    setPips(playmat.dice.pips, rollScore);
    playmat.score += rollScore;    

    if (rollScore == 1) {
        gameEnded = true;
        playmat.dice.object.classList.add("lost");
        return;
    }

    playmat.scoreDisplay.textContent = playmat.score;
    if (playmat.score >= 20) gameEnded = true;
}

const setPips = (pipList, score) => {
    // Work out which pips need to be visible on the dice.
    // Compares against a list of strings at the top of the script.
    for (let i = 0; i < pipList.length; i++) {
        console.log(pipList[i]);
        if (pipStrings[score-1][i] == "x") pipList[i].classList.remove("empty");
        else pipList[i].classList.add("empty");
    }
}

initialise();

document.getElementById("container").appendChild(playmat.object);

playmat.dice.object.addEventListener("click", diceRoll);