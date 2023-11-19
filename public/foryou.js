function loadPersonal() {
    // pick (up to) 5 random words and scramble their rhymes and similars across this list
    const history = getUserHistory();
    const words = history.words;

    // TODO: pick 5 random words from the words array
    const randoms = ['tar','moon','shelf','dread','toast']
    let output = [];
    for (i in randoms) output.push(getRecommendations(randoms[i]));

    // scramble before posting (does this work?)
    output = shuffle(output);

    const recEl = document.querySelector("#recommendations")
    //output = [];
    if (output.length) { // if there are recommendations
        // for each word to post, a row.
        for (const i in output) { 
            // create list element
            const recLiEl = document.createElement('li');

            // fill element w approriate data
            recLiEl.textContent = output[i];
            recLiEl.onclick = function() {
                const thisWord = this.textContent;
                localStorage.setItem("currentWord", thisWord);
                addToHistory(thisWord);
                window.location.href = "searchResult.html";
            };

            // add row to table
            recEl.append(recLiEl);
            recEl.append(document.createElement('br'))
        }

    } else {    // if no history, then no table or anything. Just a message.
        recEl.innerHTML = '<h4 style="text-align: center; font-weight:normal;">Make searches to get recommendations</h4>';
    }

}

function getRecommendations(word) {
    // get 3 rhymes
    // get 3 similars
    // return all in one array
    return word;
}

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle and https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function loadRandom() {
    const randomEl = document.querySelector("#random")
    
    // pick a random word from the dictionary
    let word = "muskrat";
    const url = "https://random-word-api.herokuapp.com/word?lang=en"
    fetch(url).then((x) => x.json())
        .then((response) => {
            word = response[0];
            randomEl.textContent = word;
            randomEl.onclick = function() {
                const thisWord = this.textContent;
                localStorage.setItem("currentWord", thisWord);
                addToHistory(thisWord);
                window.location.href = "searchResult.html";
            };
        });


}

async function loadPopular(){
    // consult every user's history to see which word appears the most in them all
    const response = await fetch('/api/popular');
    word = await response.json();

    // post that word
    const popularEl = document.querySelector("#popular")
    // word = "water";

    popularEl.textContent = word;
    popularEl.onclick = function() {
        const thisWord = this.textContent;
        localStorage.setItem("currentWord", thisWord);
        addToHistory(thisWord);
        window.location.href = "searchResult.html";
    };
}

function getUserHistory(){
    const userHistoryText = localStorage.getItem('userHistory');
    const userHistory = JSON.parse(userHistoryText);
    return userHistory;
}

if (JSON.parse(localStorage.getItem('currentUser')) != null) loadPersonal();
loadRandom();
loadPopular();