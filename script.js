const SYLABBLES = document.getElementById("syls-section")
const PHONOTACTICS_INPUTS = Array.from(document.getElementsByClassName("phonotactic-input"));

GenerateSylabbles();

function GenerateSylabbles() {
    onset = GetPhonotacticListFor("onset-container");
    coda = GetPhonotacticListFor("coda-container");
    inset = GetPhonotacticListFor("inset-container");


    let sylabbles = [];
    for (consonant1 of onset) { 
        for (vowel of coda) {
            if (inset[0]) for (consonant2 of inset) sylabbles.push(consonant1 + vowel + consonant2);
            else { sylabbles.push(consonant1 + vowel); }
        }
    }

    console.log(sylabbles);

    for (sylabble of sylabbles) {
        let newSylSpan = document.createElement("span");
        newSylSpan.textContent = sylabble;

        SYLABBLES.appendChild(newSylSpan);
    }
}

PHONOTACTICS_INPUTS.forEach(input => {
    input.addEventListener("keydown", (e) => {

        if (e.key === ' ') {
            e.preventDefault()
            AddCurrentToDiv(input)
        }
    })
})

function AddCurrentToDiv(input) {
    
    let pieces = input.value.trim().split(" ");
    let div = (Array.from(input.parentElement.children))[1];
    
    console.log(pieces)
    let span;
    for (piece of pieces) {
        span = document.createElement("span")
        span.textContent = piece;

        div.appendChild(span)
    }
    
    
    input.selectionStart = 1;
    input.value = null;
    input.value.trim(" ");

}

function GetPhonotacticListFor(id) {
    let container = document.getElementById(id);
    let phonoArray = [];

    Array.from(container.children).forEach(span => {
        phonoArray.push(span.textContent);
    })

    console.log(id + ": ")
    console.log(phonoArray)
    return phonoArray;
}