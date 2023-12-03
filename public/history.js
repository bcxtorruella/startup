function displayHistory() {
    // load the user's history object
    const userName = localStorage.getItem('currentUsername');
    const history = getUserHistory();
    const words = history.words;
    
    const listBodyEl = document.querySelector('#history')

    if (words.length) { // if there is history
        // for each word searched, a row.
        for (const word of words) { 
            // create list element
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
            listBodyEl.append(wordLiEl);
            listBodyEl.append(document.createElement('br'))
        }

    } else {    // if no history, then no table or anything. Just a message.
        listBodyEl.innerHTML = '<h2>Past searches appear here</h2>';
    }
}

function getUserHistory(){
    const userHistoryText = localStorage.getItem('userHistory');
    const userHistory = JSON.parse(userHistoryText);
    return userHistory;
}

displayHistory();