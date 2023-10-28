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
    let history = [];
    const historyText = localStorage.getItem('history');
    if (historyText) {
        history = JSON.parse(historyText);
    }
    
    // delete any past duplicates
    if (history.includes(word)) {
        history.splice(history.indexOf(word), 1);
    }
    
    history.unshift(word);

    if (history.length > 50) {
        history.pop();
    }

    localStorage.setItem('history', JSON.stringify(history))
}