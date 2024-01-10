let soundNames = ["boom","clap","hihat","kick","openhat","ride","snare","tink","tom"];
let soundList = [];
let sounds = {
    boom:       {keys: ["Numpad7","KeyQ"], sound: null},
    clap:       {keys: ["Numpad8","KeyW"], sound: null},
    hihat:      {keys: ["Numpad9","KeyE"], sound: null},
    kick:       {keys: ["Numpad4","KeyA"], sound: null},
    openhat:    {keys: ["Numpad5","KeyS"], sound: null},
    ride:       {keys: ["Numpad6","KeyD"], sound: null},
    snare:      {keys: ["Numpad1","KeyZ"], sound: null},
    tink:       {keys: ["Numpad2","KeyX"], sound: null},
    tom:        {keys: ["Numpad3","KeyC"], sound: null},
}

let container = document.getElementsByClassName("instrumentRow");

for (let i in sounds) {
    sounds[i]["sound"] = new Audio(`./sounds/${i}.wav`);
    soundList.push(sounds[i]["sound"]);
}

let instruments = {
    cymbal:         [sounds.openhat.sound, sounds.hihat.sound],
    smalldrum:      [sounds.snare.sound],
    bigdrum:        [sounds.boom.sound, sounds.kick.sound],
    mediumdrum:     [sounds.tom.sound],
    othercymbal:    [sounds.ride.sound],
    randrum:        soundList,
}

const chooseRandom = (list) => {
    return list[ Math.floor(Math.random()*list.length) ]
}

const hideInstructions = () => document.getElementById("instructions").classList.add("hidden");

// Go through instruments and replace filenames with the audio objects
// and add the respective image files.
for (let i in instruments) {
    let instrument = instruments[i];
    
    imageHolder = document.createElement("div");
    imageHolder.classList.add("imageHolder");
    image = document.createElement("img");
    image.src = `./images/${i}.png`
    image.classList.add(i, "instrument");
    image.setAttribute("draggable", "false");
    imageHolder.addEventListener("click", (e) => {
        let sound = chooseRandom(instruments[e.target.classList[0]]);
        console.log(sound);
        // Allows the sound to play from the beginning if it hasn't finished
        sound.currentTime = 0; 
        sound.play();

        e.target.classList.remove("shrink");
        void e.target.offsetWidth; // Needed to reset the animation.
        e.target.classList.add("shrink");
        
    });
    imageHolder.appendChild(image);
    if (i == "randrum") container[1].appendChild(imageHolder);
    else container[0].appendChild(imageHolder);
}

document.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
        hideInstructions();
        return;
    }

    for (let i in sounds) {
        let soundObject = sounds[i];
        // console.log(soundObject.keys);
        for (key in soundObject.keys) {
            if (e.code == soundObject.keys[key]) {
                soundObject.sound.currentTime = 0; 
                soundObject.sound.play();
                return;
            }
        }
    }
});

document.getElementById("instructions").addEventListener("click", (e) => {
    hideInstructions();
});