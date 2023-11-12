async function loadHistory (){
    let history = {};
    try {
        // Get the latest history from the service
        const response = await fetch('/api/history');
        history = await response.json();
    
        // Save the history in case we go offline in the future
        localStorage.setItem('history', JSON.stringify(history));
      } catch {
        // If there was an error then just use the last saved history
        const historyText = localStorage.getItem('history');
        if (historyText) {
          history = JSON.parse(historyText);
        }
      }

      displayHistory();
}

function displayHistory() {
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

function getLocalHistory(){ // 1) spits out the current user's history obj. 2) makes sure that that user does have a history obj in localStorage
    const userName = localStorage.getItem('currentUsername');

    const allHistoryText = localStorage.getItem('history');
    let allHistory = [];
    if (allHistoryText) {
        allHistory = JSON.parse(allHistoryText).history;
    }
    if (allHistory.length > 0) { // there is some history
        for ({name, words} of allHistory){
            if (name == userName) { // no need to change anything
                if (!words) words = [];
                return {name, words};
            }
        }
        // else there is history but not for this user
        const newUser = {name: userName, words: []};
        allHistory.push(newUser);
        localStorage.setItem('history', JSON.stringify({"history": allHistory}))
        for ({name, words} of allHistory){
            if (name == userName) { // should be in there now
                if (!words) words = [];
                return {name, words};
            }
        }
    } else { // no history at all. make a new user history obj
        const newHistory = {name: userName, words: []};
        localStorage.setItem('history', JSON.stringify({"history": [newHistory]}))
        return newHistory;
    }
}

loadHistory();

// history is: History[(name: John, history:{cat, dog, mouse}),(name: Emma, history: {red, blue, greed})]