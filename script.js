const SYLABBLES = document.getElementById("syls-section")

onset = ['p', 't', 'k', 's', 's', 'm', 'n', 'i', 'w', 'j'];
coda = ['a', 'e', 'i', 'o', 'u'];
sylabbles  = [];

for (consonant of onset) {
    for (vowel of coda) {
        sylabbles.push(consonant + vowel);
    }
}

for (sylabble of sylabbles) {
    let newSylSpan = document.createElement("span");
    newSylSpan.textContent = sylabble;

    SYLABBLES.appendChild(newSylSpan);
}