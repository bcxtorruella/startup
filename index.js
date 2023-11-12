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

// GetHistory. Returns all history
apiRouter.get('/history.html', (_req, res) => {
  res.send(getHistory());
});

// SubmitHistory
apiRouter.post('/update-history', (req, res) => {
  history = req.body;
  res.send(history);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function getHistory(){ // 1) spits out the current user's history obj. 2) makes sure that that user does have a history obj in localStorage
    const userName = localStorage.getItem('currentUsername');

    const allHistoryText = localStorage.getItem('history');
    let allHistory = [];
    if (allHistoryText) {
        allHistory = JSON.parse(allHistoryText).history;
    }
    return allHistory;
}

