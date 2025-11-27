// TODO:
// Improve the fittext function and make it more general
// Add dynamic resizing to the phonotactics and options divs using ^
// Add a clear button in the word div

sylabbles = document.querySelectorAll(".sylabbles li");
word = document.querySelector("#word");
spanFromWord = document.querySelector("#word span")
sylArray = [];

if (sylabbles.length === 0) { console.log("li is null") }


window.addEventListener("resize", () => {
    fitText(word);
})


sylabbles.forEach(element => {
    element.addEventListener("click", () => {
        console.log("clicked " + element.textContent)
        sylArray.push(element.textContent)
        addToWord(sylArray)
        fitText(word)
    })
});


function addToWord(syls) {
    word.innerHTML = "";
    

    syls.forEach(element => {
        let span = document.createElement("span")
        span.textContent = element
        word.appendChild(span)
    })
}




function fitText(container) {
    let children = Array.from(container.children)

    let spansWidth = calculateSpansWidth(container);
    let boxWidth = calculateBoxWidth(container);

    let size = parseFloat(getComputedStyle(children[0]).fontSize);

    while (isTooBig(spansWidth, boxWidth) || isTooSmall(spansWidth, boxWidth) && size > 5) {

        if (isTooBig(spansWidth, boxWidth)) size--;
        if (isTooSmall(spansWidth, boxWidth)) size++;

        children.forEach(element => {
            element.style.fontSize = size + "px";
        })

        spansWidth = calculateSpansWidth(container);
        boxWidth = calculateBoxWidth(container);


    } 
    
    console.log("spansWidth = " + spansWidth);
    console.log("boxWidth = " + boxWidth);
    

        
}


function isTooBig(size, boxSize) { return size > (boxSize); }
function isTooSmall(size, boxSize) { return size < (boxSize - (boxSize*0.2)); }

function calculateBoxWidth(container) { return container.clientWidth; }

function calculateSpansWidth(container) {
    let children = Array.from(container.children);
    let spansWidth = 0;

    children.forEach(span => {
        spansWidth += span.clientWidth
    })

    return spansWidth;

}

function copyWords() {
    let text = document.getElementById("words").textContent.split('\n').map(line => line.trim()).join('\n');

    console.log(text)
    navigator.clipboard.writeText(text).then(() => {
        console.log("Copied text")
    });
}