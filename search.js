// set current word and move to result screen
async function search() {
    const inputEl = document.querySelector('#search-bar')
    const word = inputEl.value;

    if (word.length) {
        localStorage.setItem("currentWord", word);
        addToHistory(word); 

        // tell everyone else you just searched it
        configureWebSocket();
        const me = JSON.parse(localStorage.getItem('currentUsername'));
        await broadcastEvent(me, "search", word);

        // display results
        window.location.href = "searchResult.html";
    }
}

async function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new Promise ((resolve) => {
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.onopen = () => resolve(socket);
    } ) 

    //allow connection to open
    await delay(2000);
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    // while (socket.readyState == 0) { let int = 0; await setInterval(() => {let hi = 0;}, 1000) }
    (await this.socket).send(JSON.stringify(event)); // calls socket.onmessage for everyone else
    //this.socket.close()
}

async function addToHistory(word) {
    let history = getUserHistory(); // history obj for user
    const words = history.words;

    const userName = JSON.parse(localStorage.getItem('currentUsername'));
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

    // update the service
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