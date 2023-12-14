const express = require('express');
const { get } = require('http');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up the frontend static content hosting
app.use(express.static('./src'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: './src' });
});

// potential change: convert all function calls in /public
// history.html init -> add-user
// update-history(wholeArray) -> add-word(word)
// most of GetHistory stays the same

// current behavior: add-user will indeed be part of gethistory
// not addword. just overwrite the whole brute each time :)
//    go back to changes to revert


// AddUser
// apiRouter.post('/add-user', async (req, res) => {
//   const newUser = req.body;
//   const history = await DB.addUser(newUser);
//   res.send(history);
// });

// GetHistory. Returns all history. Can initialize user's profile
apiRouter.get('/history.html', async (req, res) => {
    // const userName = req.body;
    const history = await DB.getHistory();
    res.send(history);
});

// AddWord
// apiRouter.post('/add-word', async (req, res) => {
//   const newWord = req.body;
//   const history = await DB.addWord(newWord);
//   res.send(history);
// });

// SubmitHistory
apiRouter.post('/update-history', async (req, res) => {
  const history = req.body;
  // if (history == {}) history = [{name: 'default', words: []}];
  await DB.updateHistory(history);
  res.send();
});

// GetPopular
// apiRouter.get('/popular', (_req, res) => {
//     popular = "water";
//     calculatePopular(); 
//     res.send(JSON.stringify(popular));
// });



const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);

// function getHistory(){ // 1) spits out the current user's history obj. 2) makes sure that that user does have a history obj in localStorage
//     const allHistoryText = localStorage.getItem('history');
//     let allHistory = [];
//     if (allHistoryText) {
//         allHistory = JSON.parse(allHistoryText).history;
//     }
//     return allHistory;
// }

// function calculatePopular () {
//     return "water";
// // TODO: fix later
//     // let isEmpty = true;
//     // for (let user of history['history'].history)
//     //     if (user.words.length > 0) isEmpty = false;
//     // if (isEmpty) { return "water"; }


//     // let allWords = {};
//     // for (let user of history['history'].history) {
//     //     const words = user.words;
//     //     for (const word in words) {
//     //         if (!(words[word] in allWords)) {
//     //             allWords[words[word]] = 0;
//     //         }
//     //         allWords[words[word]]++;
//     //     }
//     // }
//     // let max = 0;
//     // let maxKey = "";
//     // for (let thisWord in allWords) {
//     //     if (allWords[thisWord] > max) {
//     //         max = allWords[thisWord];
//     //         maxKey = thisWord;
//     //     }
//     // }
//     // popular = allWords[maxKey];
//     // return popular;
// }
