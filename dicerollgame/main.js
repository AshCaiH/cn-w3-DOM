const pipStrings = [
    "    x    ",
    "x       x",
    "x   x   x",
    "x x   x x",
    "x x x x x",
    "x xx xx x",
]

let replayBtn = document.getElementsByClassName("replayBtn")[0];
let resultText = document.getElementById("result");

let gameEnded = null;
let playmats = [];
let players = 1;
let activeMat = 0;
let targetScore = 20;

const playerSelect = (e) => {
    players = e.target.getAttribute("value");
    initialise();
}

const initialise = () => {
    playmats = [];
    document.getElementById("container").innerHTML = "";
    resultText.textContent = "";

    for (let i = 0; i < players; i++) {
        let playmat = playmats[i];

        if (playmat != null) playmat.object.remove();

        gameEnded = false;
        activeMat = 0;

        replayBtn.classList.add("hidden");

        playmat = {    
            object: document.getElementsByClassName("playmatHolder")[0].cloneNode(true),
            score: 0,
            roundScore: 0,
            scoreDisplay: null,
            roundScoreDisplay: null,
            active: activeMat == i
        }

        playmats[i] = playmat;
        
        let dice = playmat.dice = {object: playmat.object.getElementsByClassName("dice")[0]}
        playmat.dice.object.style.rotate = `0deg`
        playmat.dice.object.style.top = `0px`
        playmat.dice.object.style.left = `0px`

        playmat.scoreDisplay = playmat.object.getElementsByClassName("score")[0];
        playmat.roundScoreDisplay = playmat.object.getElementsByClassName("roundScore")[0];
        
        dice.face = dice.object.getElementsByClassName("diceFace")[0];
        dice.pips = dice.face.getElementsByClassName("pip");
        dice.object.classList.remove("lost");
        dice.object.addEventListener("click", diceRoll);

        setPips(playmat.dice.pips, 1);

        let passBtn = playmat.object.getElementsByClassName("passBtn")[0];
        passBtn.addEventListener("click", pass);

        document.getElementById("container").appendChild(playmat.object);
    }
    
    setActive();
    updateScoreText();

    // Hide or show elements depending on number of players.
    if (players > 1) {
        for (let item of document.querySelectorAll(".multiOff")) {
            item.classList.remove("multiOff");
            item.classList.add("multiOn");
        }
    } else {
        for (item of document.querySelectorAll(".multiOn")) {
            item.classList.remove("multiOn");
            item.classList.add("multiOff");
        }
    }
}

const setActive = () => {
    for (let i in playmats) {
        let playmat = playmats[i];
        if (activeMat == i) playmat.object.classList.remove("inactive");
        else playmat.object.classList.add("inactive");
    }
}

const checkActive = (e) => {
    if (gameEnded) return false;
    if (playmats[activeMat].object.contains(e.target)) return true;
    else return false;
}

const diceRoll = (e) => {
    if (gameEnded) return;

    let playmat = playmats[activeMat];

    // If the dice being clicked isn't in the active playmat, ignore it.
    if (!checkActive(e)) return;

    playmat.dice.object.style.rotate = `${Math.random() * 20 - 10}deg`
    playmat.dice.object.style.top = `${Math.random() * 10 - 5}px`
    playmat.dice.object.style.left = `${Math.random() * 10 - 5}px`
    let rollScore = Math.ceil( Math.random() * 6 );

    setPips(playmat.dice.pips, rollScore);

    if (players == 1) {
        // Single Player Rules
        playmat.score += rollScore;

        if (rollScore == 1) {
            endGame(false)
            playmat.dice.object.classList.add("lost");
            return;
        }

        if (playmat.score >= 20) endGame(true);
    } else {
        // Multiplayer rules
        playmat.roundScore += rollScore;

        if (rollScore == 1) {
            playmat.roundScore = 0;
            activeMat += 1;

            if (activeMat == players) activeMat = 0;
            setActive();
        }

        if (playmat.roundScore + playmat.score >= targetScore) {
            playmat.score += playmat.roundScore;
            endGame(true);
        }
    }

    updateScoreText();
}

const pass = (e) => {
    if (!checkActive(e)) return;

    let playmat = playmats[activeMat];

    playmat.score += playmat.roundScore;
    playmat.roundScore = 0;
    updateScoreText();
    
    activeMat += 1;

    if (activeMat == players) activeMat = 0;
    setActive();
}

const updateScoreText = () => {
    for (let playmat of playmats) {
        playmat.scoreDisplay.textContent = playmat.score;
        playmat.roundScoreDisplay.textContent = playmat.roundScore;
    }
}

const endGame = (isWin) => {
    // TODO: Change all playmats to say final score.
    document.getElementsByClassName("scoreLabel")[1].textContent = "Final Score";
    gameEnded = true;

    replayBtn.classList.remove("hidden");

    if (isWin) {
        if (players == 1) resultText.textContent = `You win!`;
        else resultText.textContent = `Player ${activeMat + 1} wins!`;
    } else resultText.textContent = 'You rolled a one...';
}

const setPips = (pipList, score) => {
    // Work out which pips need to be visible on the dice.
    // Compares against a list of strings at the top of the script.
    for (let i = 0; i < pipList.length; i++) {
        if (pipStrings[score-1][i] == "x") pipList[i].classList.remove("empty");
        else pipList[i].classList.add("empty");
    }
}

for (btn of document.getElementById("playerSelect").getElementsByClassName("btn")) {
    btn.addEventListener("click", playerSelect);
}

initialise();

replayBtn.addEventListener("click", initialise);