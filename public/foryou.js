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

                // tell everyone else you just searched it
                configureWebSocket();
                const me = JSON.parse(localStorage.getItem('currentUsername'));
                broadcastEvent(me, "search", thisWord);

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

                // tell everyone else you just searched it
                configureWebSocket();
                const me = JSON.parse(localStorage.getItem('currentUsername'));
                broadcastEvent(me, "search", word);

                window.location.href = "searchResult.html";
            };
        });


}

async function loadPopular(){
    // consult every user's history to see which word appears the most in them all
    // TODO: use websocket to constantly display the last searched word by any user 
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // receive message from socket -- other user's broadcastEvent()
    const popularEl = document.querySelector("#popular")
    popularEl.textContent = "No one's online!";
    this.socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text()); // parses what is sent by broadcastEvent()

        // post whatever word was sent
        popularEl.textContent = `${msg.from} just searched for ${msg.value}`;
    };

    // const response = await fetch('/api/popular');
    // popular = await response.json();

    popularEl.onclick = function() {
        const strip = this.textContent.split(" ")
        const thisWord = strip[strip.length - 1];
        localStorage.setItem("currentWord", thisWord);
        addToHistory(thisWord);

        // tell everyone else you just searched it
        configureWebSocket();
        const me = JSON.parse(localStorage.getItem('currentUsername'));
        broadcastEvent(me, "search", thisWord);

        window.location.href = "searchResult.html";
    };
}

function getUserHistory(){
    const userHistoryText = localStorage.getItem('userHistory');
    const userHistory = JSON.parse(userHistoryText);
    return userHistory;
}

loadPersonal();
loadRandom();
loadPopular();