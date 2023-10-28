function loadHistory(user) {
    // load the user's history object
    let history = [];
    const historyText = localStorage.getItem('history');
    if (historyText) {
        history = JSON.parse(historyText);
    }
    const listBodyEl = document.querySelector('#history')

    if (history.length) { // if there is history
        // for each word searched, a row.
        for (const word of history.values()) { 
            // create list element
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

    } else {    // if no history, then no table or anything. Just a message.
        listBodyEl.innerHTML = '<h2>Past searches appear here</h2>';
    }
}

loadHistory();