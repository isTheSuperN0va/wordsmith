// TODO:
// Improve the fittext function and make it more general
// Add dynamic resizing to the phonotactics and options divs using ^
// Add a clear button in the word div

sylabbles = document.querySelectorAll(".sylabbles li");
wordContainer = document.querySelector("#wordContainer");
word = document.querySelector("#word")
words = document.querySelector("#wordsLi");
spanFromWord = document.querySelector("#word span")
sylArray = [];

if (sylabbles.length === 0) { console.log("li is null") }


// window.addEventListener("resize", () => {
//     fitText(wordContainer);
// })

sylArray = ["to", "ki"]
addToWord(sylArray);


sylabbles.forEach(element => {
    element.addEventListener("click", () => {
        console.log("clicked " + element.textContent)
        sylArray.push(element.textContent)
        
        console.log(sylArray[0]);
        addToWord(sylArray)
        
         document.fonts?.ready
            .then(() => requestAnimationFrame(() => fitText(wordContainer)))
            .catch(() => requestAnimationFrame(() => fitText(wordContainer)));
    })
});

Array.from(word.children).forEach(span => {
    span.addEventListener("click", () => {
        console.log("clicked " + span.classList)

        
        if (span.classList != "selected-sylabble") {
            deselectAllSyls();
            span.classList.add("selected-sylabble");
        }
        else span.classList.remove("selected-sylabble");

    })
})

function deselectAllSyls() {
    Array.from(word.children).forEach(span => {
        if (span.classList != null) { span.classList.remove("selected-sylabble"); }
    })
}


function addToWord(syls) {
    word.innerHTML = "";
    

    syls.forEach(element => {
        let span = document.createElement("span")
        span.textContent = element
        word.appendChild(span)

        console.log("added " + element + " to word")
    })
}




function fitText(container) {
    let children = Array.from(word.children)

    let spansWidth = calculateSpansWidth(word);
    let boxWidth = calculateBoxWidth(container);

    let size = parseFloat(getComputedStyle(children[0]).fontSize);

    while (isTooBig(spansWidth, boxWidth) || isTooSmall(spansWidth, boxWidth) && size > 5) {

        if (isTooBig(spansWidth, boxWidth)) size--;
        if (isTooSmall(spansWidth, boxWidth)) size++;

        children.forEach(element => {
            element.style.fontSize = size + "px";
        })

        spansWidth = calculateSpansWidth(word);
        boxWidth = calculateBoxWidth(container);


    } 
    
    console.log("spansWidth = " + spansWidth);
    console.log("boxWidth = " + boxWidth);
    

        
}


function isTooBig(size, boxSize) { return size > (boxSize) - (boxSize*0.2); }
function isTooSmall(size, boxSize) { return size < (boxSize - (boxSize*0.4)); }

function calculateBoxWidth(container) { return container.clientWidth; }

function calculateSpansWidth(container) {

    let children = Array.from(container.children);

    if (children == null) { console.error("no children dectected in the word container"); }
    else { console.error(children[0].offsetWidth); }


    let spansWidth = 0;

    children.forEach(span => {
        spansWidth += span.offsetWidth
    })

    if (spansWidth == 0) { console.log("spanswidth returned 0") }

    return spansWidth;

}

function copyWords() {
    let text = document.getElementById("words").textContent.split('\n').map(line => line.trim()).join('\n');

    console.log(text)
    navigator.clipboard.writeText(text).then(() => {
        console.log("Copied " + text);
    });
}

function clearWord() { 
    word.innerHTML = "";
    sylArray = [];
    console.log("cleared word"); 
}

function clearWords() {
    Array.from(words.children).forEach(element => {
        element.remove();
        console.log("accessing " + element);
    })

    console.log("removed stored words")
}

function addWordToList() {
    let arrangedWord = "";

    sylArray.forEach(syl => {
        arrangedWord += syl;
    })

    console.log("arranged to " + arrangedWord);

    li = document.createElement("li");
    li.textContent = arrangedWord;
    words.appendChild(li)

}