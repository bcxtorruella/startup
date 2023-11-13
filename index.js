const express = require('express');
const { get } = require('http');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetHistory. Returns all history. Used to cache at login
let history = [{name: 'default', words: []}];
apiRouter.get('/history.html', (_req, res) => {
    if (!history) 
        history = [{name: 'default', words: []}];
    res.send(history);
});

// SubmitHistory
apiRouter.post('/update-history', (req, res) => {
  history = req.body;
  if (history == {}) history = [{name: 'default', words: []}];
  res.send(history);
});

// GetPopular
apiRouter.get('/popular', (_req, res) => {
    popular = "water";
    calculatePopular(history);
    res.send(JSON.stringify(popular));
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// function getHistory(){ // 1) spits out the current user's history obj. 2) makes sure that that user does have a history obj in localStorage
//     const allHistoryText = localStorage.getItem('history');
//     let allHistory = [];
//     if (allHistoryText) {
//         allHistory = JSON.parse(allHistoryText).history;
//     }
//     return allHistory;
// }

let popular = "water";
function calculatePopular (history) {
    return "water";
// TODO: fix later
    // let isEmpty = true;
    // for (let user of history['history'].history)
    //     if (user.words.length > 0) isEmpty = false;
    // if (isEmpty) { return "water"; }


    // let allWords = {};
    // for (let user of history['history'].history) {
    //     const words = user.words;
    //     for (const word in words) {
    //         if (!(words[word] in allWords)) {
    //             allWords[words[word]] = 0;
    //         }
    //         allWords[words[word]]++;
    //     }
    // }
    // let max = 0;
    // let maxKey = "";
    // for (let thisWord in allWords) {
    //     if (allWords[thisWord] > max) {
    //         max = allWords[thisWord];
    //         maxKey = thisWord;
    //     }
    // }
    // popular = allWords[maxKey];
    // return popular;
}


