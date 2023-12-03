function loadResult () {
    // get current word
    const word = localStorage.getItem("currentWord");

    // put in header
    const headwordEl = document.querySelector('#headword');
    headwordEl.textContent = word;

    // populate list of Rhymes
    const rhymes = getRhymes(word);
    let listBodyEl = document.querySelector('#rhymes');
    populateCardList(listBodyEl, rhymes);

    // populate list of Similars
    const similars = getSimilars(word);
    listBodyEl = document.querySelector('#similars');
    populateCardList(listBodyEl, similars);

    // TODO: check to see if this works once the dictionary is running
    if (rhymes.length == 0 && similars.length == 0) {
        document.querySelector('#no-results').setAttribute('display', 'block')
    }
}

function populateCardList(listElement, values){
    if (values.length) { 
        for (const word of values) { 
            const wordLiEl = document.createElement('li');

            // fill element w approriate data
            wordLiEl.textContent = word;
            wordLiEl.onclick = function() {
                const thisWord = this.textContent;
                localStorage.setItem("currentWord", thisWord);
                addToHistory(thisWord);

                // tell everyone else you just searched it
                configureWebSocket();
                const me = JSON.parse(localStorage.getItem('currentUsername'));
                broadcastEvent(me, "search", word);

                window.location.href = "searchResult.html";
            };

            // add row to table
            listElement.append(wordLiEl);
            listElement.append(document.createElement('br'))
        }

    } else {
        listElement.innerHTML = `<p style="text-align: center;">Results will appear here</p>`;
    }

    return listElement;
}

function getRhymes(word) {
    // TODO: get rhymes data here. Will need in FYP as well
    return ["fat", "cat", "sat", "mat"];
}

function getSimilars(word) {
    // TODO: get similars data here. Will need in FYP as well
    return ["tree", "bush", "plant", "leafy thing"];
}

loadResult()