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

function addToHistory(word) {
    const username = localStorage.getItem('username');
    let history = getLocalHistory().username;
    
    // delete any past duplicates
    if (history.includes(word)) {
        history.splice(history.indexOf(word), 1);
    }
    
    history.unshift(word);

    if (history.length > 50) {
        history.pop();
    }

    // this should put it in locally
    const allHistory = getLocalHistory();
    for (user in allHistory) {
        if (user.name == username) {
            user.history = history;
        }
    }
    localStorage.setItem('history', JSON.stringify(allHistory))
}