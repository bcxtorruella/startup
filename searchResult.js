function loadResult () {
    // get current word
    const word = localStorage.getItem("currentWord");

    // put in header
    const headwordEl = document.querySelector('#headword');
    headwordEl.textContent = word;

    // get rhymes data here
    const rhymes = ["fat", "cat", "sat", "mat"]

    // populate list of Rhymes
    let listBodyEl = document.querySelector('#rhymes')

    if (rhymes.length) { 
        for (const word of rhymes) { 
            const wordLiEl = document.createElement('li');

            // fill element w approriate data
            wordLiEl.textContent = word;
            wordLiEl.onclick = function() {
                const thisWord = this.textContent;
                localStorage.setItem("currentWord", thisWord);
                addToHistory(thisWord);
                window.location.href = "searchResult.html";
            };
            wordLiEl.onmouseover

            // add row to table
            listBodyEl.append(wordLiEl);
            listBodyEl.append(document.createElement('br'))
        }

    } else {
        listBodyEl.innerHTML = '<h2>Rhymes will appear here</h2>';
    }

    // get similars data here
    const similars = ["tree", "bush", "plant", "leafy thing"]

    // populate list of Similars
    listBodyEl = document.querySelector('#similars')

    if (similars.length) { 
        for (const word of similars) { 
            const wordLiEl = document.createElement('li');

            // fill element w approriate data
            wordLiEl.textContent = word;
            wordLiEl.onclick = function() {
                const thisWord = this.textContent;
                localStorage.setItem("currentWord", thisWord);
                addToHistory(thisWord);
                window.location.href = "searchResult.html";
            };
            wordLiEl.onmouseover

            // add row to table
            listBodyEl.append(wordLiEl);
            listBodyEl.append(document.createElement('br'))
        }

    } else {
        listBodyEl.innerHTML = '<h2>Rhymes will appear here</h2>';
    }

    // TODO: check to see if this works once the dictionary is running
    if (rhymes.length == 0 && similars.length == 0) {
        document.querySelector('#no-results').setAttribute('display', 'block')
    }


}

loadResult()