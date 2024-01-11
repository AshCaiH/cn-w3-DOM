const pipStrings = [
    "    x    ",
    "x       x",
    "x   x   x",
    "x x   x x",
    "x x x x x",
    "x xx xx x",
]

let replayBtn = document.getElementById("replayBtn");

let gameEnded = null;
let playmats = [];
let players = 1;
let activeMat = 0;

const initialise = () => {
    for (let i = 0; i < players; i++) {
        let playmat = playmats[i];

        if (playmat != null) playmat.object.remove();

        gameEnded = false;

        replayBtn.classList.add("hidden");

        playmat = {    
            object: document.getElementsByClassName("playmat")[0].cloneNode(true),
            score: 0,
            scoreDisplay: null,
            active: activeMat == i
        }

        playmats[i] = playmat;
        
        playmat.dice = {
            object: playmat.object.getElementsByClassName("dice")[0]
        }
        playmat.dice.face = playmat.dice.object.getElementsByClassName("diceFace")[0];
        playmat.scoreDisplay = playmat.object.getElementsByClassName("score")[0];

        playmat.dice.pips = playmat.dice.face.getElementsByClassName("pip");

        playmat.dice.object.classList.remove("lost");
        playmat.scoreDisplay.textContent = playmat.score;

        playmat.object.addEventListener("click", diceRoll);
        document.getElementById("container").appendChild(playmat.object);
    }
}

const diceRoll = () => {
    if (gameEnded) return;

    let playmat = playmats[activeMat];

    playmat.dice.object.style.rotate = `${Math.random() * 20 - 10}deg`
    playmat.dice.object.style.top = `${Math.random() * 10 - 5}px`
    playmat.dice.object.style.left = `${Math.random() * 10 - 5}px`
    let rollScore = Math.ceil( Math.random() * 6 );

    setPips(playmat.dice.pips, rollScore);
    playmat.score += rollScore;

    if (rollScore == 1) {
        endGame(false)
        playmat.dice.object.classList.add("lost");
        return;
    }

    playmat.scoreDisplay.textContent = playmat.score;
    if (playmat.score >= 20) endGame(true);
}

const endGame = (isWin) => {
    document.getElementsByClassName("scoreLabel")[0].textContent = "Final Score";
    gameEnded = true;

    replayBtn.classList.remove("hidden");
}

const setPips = (pipList, score) => {
    // Work out which pips need to be visible on the dice.
    // Compares against a list of strings at the top of the script.
    for (let i = 0; i < pipList.length; i++) {
        if (pipStrings[score-1][i] == "x") pipList[i].classList.remove("empty");
        else pipList[i].classList.add("empty");
    }
}

initialise();

replayBtn.addEventListener("click", initialise);