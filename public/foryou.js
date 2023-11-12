function loadPersonal() {
    // pick (up to) 5 random words and scramble their rhymes and similars across this list
    const history = getLocalHistory();
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
        for (const word of output) { 
            // create list element
            const recLiEl = document.createElement('li');

            // fill element w approriate data
            recLiEl.textContent = word;
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
    return "placeholder";
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
    const allHistory = JSON.parse(localStorage.getItem('history')).history;
    let allWords = {};
    for (const user in allHistory) {
        const words = allHistory[user].words;
        for (const word in words) {
            if (!(words[word] in allWords)) {
                allWords[words[word]] = 0;
            }
            allWords[words[word]]++;
        }
    }
    let max = 0;
    let maxKey = "";
    for (let thisWord in allWords) {
        if (allWords[thisWord] > max) {
            max = allWords[thisWord];
            maxKey = thisWord;
        }
    }
    const word = maxKey;

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

loadPersonal();
loadRandom();
loadPopular();