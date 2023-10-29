function loadHistory() {
    // load the user's history object
    const userName = localStorage.getItem('currentUsername');
    const history = getLocalHistory();
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

function getLocalHistory(){
    const userName = localStorage.getItem('currentUsername');

    const allHistoryText = localStorage.getItem('history');
    let allHistory = [];
    if (allHistoryText) {
        allHistory = JSON.parse(allHistoryText).history;
    }
    if (allHistory.length > 0) { // there is some history
        for ({name, words} of allHistory){
            if (name == userName) {
                if (!words) words = [];
                return {name, words};
            }
        }
        // else there is history but not for this user
        const newUser = {name: userName, words: []};
        allHistory.push(newUser);
        localStorage.setItem('history', JSON.stringify(allHistory))
        for ({name, words} of allHistory){
            if (name == userName) { // should be in there now
                if (!words) words = [];
                return {name, words};
            }
        }
    } else { // no history at all. make a new obj
        const newHistory = {"history": [{name: userName, words: []}]};
        localStorage.setItem('history', JSON.stringify(newHistory))
        return newHistory.history[0];
    }
}

loadHistory();

// history is: History[(name: John, history:{cat, dog, mouse}),(name: Emma, history: {red, blue, greed})]