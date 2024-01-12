let outputsContainer = document.getElementById("outputs")

let outputObjects = document.getElementsByClassName("outputText");

let textbox = document.getElementById("inputbox")

document.addEventListener("keypress", (e) => {
    console.log(e);

    let outputs = [e.code, e.key, e.charCode, e.shiftKey];
    let outputLabels = ["Code", "Key", "ASCII Character Code", "Shift Pressed"];

    // Setting the outputsContainer structure here so if we decided to add more
    // outputs later on, we wouldn't need to adjust the HTML file at all.
    outputsContainer.textContent = "";
    for (let i = 0; i < outputs.length; i++) {
        let outputItem = document.createElement("div");
        outputItem.classList.add("outputItem");
        outputItem.innerHTML += `<label class="label">${outputLabels[i]}</label>`
        outputItem.innerHTML += `<p class="outputText">${outputs[i]}</p>`
        outputsContainer.appendChild(outputItem);
    }
    textbox.value = e.key;
});

