let soundNames = ["boom","clap","hihat","kick","openhat","ride","snare","tink","tom"];
let soundFiles = [];
let imageFiles = [];

let container = document.getElementById("content");

let instruments = {
    cymbal: ["openhat", "hihat"],
    smalldrum: ["snare"],
    bigdrum: ["boom", "kick"],
    mediumdrum: ["tom"],
    othercymbal: ["ride"],
    randrum: soundNames,
}

const chooseRandom = (list) => {
    return list[ Math.floor(Math.random()*list.length) ]
}

// Go through instruments and replace filenames with the audio objects
// and add the respective image files.
for (let i in instruments) {
    let instrument = instruments[i];
    for (let s in instrument) {
        instrument[s] = new Audio(`./sounds/${instrument[s]}.wav`);
    }
    
    imageHolder = document.createElement("div");
    imageHolder.classList.add("imageHolder");
    image = document.createElement("img");
    image.src = `./images/${i}.png`
    image.classList.add(i, "instrument");
    imageHolder.addEventListener("click", (e) => {
        let sound = chooseRandom(instruments[e.target.classList[0]])
        // Without this, the sound has to completely finish before it can be played again
        sound.currentTime = 0; 
        sound.play();
        e.target.style.scale = 0.8;
    });
    imageHolder.appendChild(image);
    container.appendChild(imageHolder);
}