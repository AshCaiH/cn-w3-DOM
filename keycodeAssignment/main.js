let outputsContainer = document.getElementById("outputs")

let outputObjects = document.getElementsByClassName("outputText");

let textbox = document.getElementById("inputbox")

document.addEventListener("keypress", (e) => {
    console.log(e);

    let outputs = [e.code, e.key, e.charCode, e.shiftKey];
    let outputLabels = ["Code", "Key", "ASCII Character Code", "Shift Pressed"];

    // Setting the outputsContainer structure here so if we decided to add more
    // outputs later on, we wouldn't need to adjust the HTML file at all.
    let outputString = ""
    for (let i = 0; i < outputs.length; i++) {        
        outputString += `<div class="outputItem">`
        outputString += `<label class="label">${outputLabels[i]}</label>`
        outputString += `<p class="outputText">${outputs[i]}</p>`
        outputString += `</div>`
    }
    outputsContainer.innerHTML = outputString;
    textbox.value = e.key;
});
