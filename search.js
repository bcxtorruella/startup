// set current word and move to result screen
function search() {
    const inputEl = document.querySelector('#search-bar')
    const word = inputEl.value;
    localStorage.setItem("currentWord", word);
    addToHistory(word); 
    window.location.href = "searchResult.html";
}

function addToHistory(word) {
    let history = [];
    const historyText = localStorage.getItem('history');
    if (historyText) {
        history = JSON.parse(historyText);
    }
    
    history.unshift(word);

    // if (history.length > 50) {
    //     history.pop();
    // }

    localStorage.setItem('history', JSON.stringify(history))
}