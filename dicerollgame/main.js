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
let players = 3;
let activeMat = 0;
let targetScore = 20;

const initialise = () => {
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

        playmat.scoreDisplay = playmat.object.getElementsByClassName("score")[0];
        playmat.scoreDisplay.textContent = playmat.score;

        playmat.roundScoreDisplay = playmat.object.getElementsByClassName("roundScore")[0];
        playmat.roundScoreDisplay.textContent = playmat.roundScore;
        
        dice.face = dice.object.getElementsByClassName("diceFace")[0];
        dice.pips = dice.face.getElementsByClassName("pip");
        dice.object.classList.remove("lost");
        dice.object.addEventListener("click", diceRoll);        

        document.getElementById("container").appendChild(playmat.object);
    }

    // Hide or show elements depending on number of players.
    console.log(document.getElementsByClassName("multiOff"))
    if (players > 1) {
        for (item of document.getElementsByClassName("multiOff")) {            
            item.classList.remove("multiOff");
            item.classList.add("multiOn");
        }
    } else {
        for (item of document.getElementsByClassName("multiOn")) {
            item.classList.remove("multiOn");
            item.classList.add("multiOff");
        }
    }

    setActive();
}

const setActive = () => {
    for (let i in playmats) {
        let playmat = playmats[i];
        if (activeMat == i) playmat.object.classList.remove("inactive");
        else playmat.object.classList.add("inactive");
    }
}

const diceRoll = (e) => {
    if (gameEnded) return;

    let playmat = playmats[activeMat];

    console.log(playmat.object.contains(e.target));

    // If the dice being clicked isn't in the active playmat, ignore it.
    if (!playmat.object.contains(e.target)) return;

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

        playmat.scoreDisplay.textContent = playmat.score;
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

        playmat.roundScoreDisplay.textContent = playmat.roundScore;

        if (playmat.roundScore + playmat.score >= targetScore) {
            playmat.score += playmat.roundScore;
            playmat.scoreDisplay.textContent = playmat.score;
            endGame(true);
        }
    }
}

const endGame = (isWin) => {
    // TODO: Change all playmats to say final score.
    document.getElementsByClassName("scoreLabel")[1].textContent = "Final Score";
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