function loadPersonal() {
    // pick (up to) 5 random words and scramble their rhymes and similars across this list
    history = getLocalHistory();

}

function loadRandom() {
    randomEl = document.querySelector("#random")
    
    // TODO: pick a random word from the dictionary
    word = "muskrat";

    randomEl.textContent = word;
    randomEl.onclick = function() {
        const thisWord = this.textContent;
        localStorage.setItem("currentWord", thisWord);
        addToHistory(thisWord);
        window.location.href = "searchResult.html";
    };
}

function loadPopular(){
    // consult every user's history to see which word appears the most in them all

}

function getLocalHistory(){
    const historyText = localStorage.getItem('history');
    let history = []
    if (historyText) {
        history = JSON.parse(historyText);
    } else {
        history = [{name: "testUser", history: ["test", "again"]}];
    }
    return history;
}



loadPersonal();
loadRandom();
loadPopular();