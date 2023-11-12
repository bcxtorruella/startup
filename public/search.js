// set current word and move to result screen
function search() {
    const inputEl = document.querySelector('#search-bar')
    const word = inputEl.value;

    if (word.length) {
        localStorage.setItem("currentWord", word);
        addToHistory(word); 
        window.location.href = "searchResult.html";
    }
}

async function addToHistory(word) {
    let history = getLocalHistory(); // history obj for user
    const words = history.words;

    const userName = localStorage.getItem('currentUsername');
    const allHistoryText = localStorage.getItem('history');
    let newAllHistory = JSON.parse(allHistoryText).history;
    
    // delete any past duplicates
    if (words.includes(word)) {
        words.splice(words.indexOf(word), 1);
    }

    // make new word list (never longer than 50)
    words.unshift(word);
    if (words.length > 50) {
        words.pop();
    }

    // this should put it in locally
    for (i in newAllHistory) {
        if (newAllHistory[i].name == userName) {
            newAllHistory[i].words = words;
        }
    }
    localStorage.setItem('history', JSON.stringify({"history": newAllHistory}))

    //update the service
    const response = await fetch('/api/history', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newAllHistory),
      });
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