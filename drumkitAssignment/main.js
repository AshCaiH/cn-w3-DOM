let soundNames = ["boom","clap","hihat","kick","openhat","ride","snare","tink","tom"];
let soundFiles = [];
let imageNames = ["bigdrum", "cymbal", "randrum", "smalldrum", "mediumdrum", "othercymbal"];

for (sound of soundNames) {
    soundFiles.push(new Audio(`./sounds/${sound}.wav`));
}

const chooseRandom = (list) => {
    return list[ Math.floor(Math.random()*list.length) ]
}

document.addEventListener('click', (e) => {
    chooseRandom(soundFiles).play();
});