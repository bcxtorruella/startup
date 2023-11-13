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
    let history = getUserHistory(); // history obj for user
    const words = history.words;

    const userName = localStorage.getItem('currentUsername');
    const allHistoryText = localStorage.getItem('history');
    let newAllHistory = JSON.parse(allHistoryText);
    
    // delete any past duplicates
    if (words.includes(word)) {
        words.splice(words.indexOf(word), 1);
    }

    // make new word list (never longer than 50)
    words.unshift(word); // add most recent to front
    if (words.length > 50) {
        words.pop();
    }

    // this should put it in locally
    for (i in newAllHistory) {
        if (newAllHistory[i].name == userName) {
            newAllHistory[i].words = words;
        }
    }

    // update userHistory
    localStorage.setItem("userHistory", JSON.stringify(history));

    // update all history
    localStorage.setItem('history', JSON.stringify(newAllHistory))

    //update the service
    const response = await fetch('/api/update-history', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newAllHistory),
      });
    let brk = 0;
}

function getUserHistory(){
    const userHistoryText = localStorage.getItem('userHistory');
    const userHistory = JSON.parse(userHistoryText);
    return userHistory;
}