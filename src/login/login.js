async function loadHistory (){  // contact service to cache user's history
  let history = {};
  const userName = JSON.parse(localStorage.getItem("currentUsername"))
  // Get the latest history from the service
  const response = await fetch('/api/history.html');
  history = await response.json();

  // cache only this user
  /*** 
  const allHistoryText = localStorage.getItem('history');
  let allHistory = [];
  if (allHistoryText) {
      allHistory = JSON.parse(allHistoryText).history;
  }
  */
  const userHistory = checkHistory(history, userName); // nothing to return right??
  localStorage.setItem('userHistory', JSON.stringify(userHistory))
}

function checkHistory(history, userName){ // 1) caches the allHistory obj. 2) makes sure that that user does have a history obj in localStorage
  let userHistory = {};
  if (history.length > 0) { // 1: there is some history. no need to change anything
      userHistory = findUserHistory(history, userName);
      if (userHistory != null) {return userHistory};

      // 2: else there is history but not for this user
      const newUser = {name: userName, words: []};
      history.push(newUser);
      localStorage.setItem('history', JSON.stringify(history))
      userHistory = findUserHistory(history, userName);   // should be in there now
      saveHistory(history);
      return userHistory;

  } else { // 3: no history at all. make a new user history obj
      const newHistory = [{name: userName, words: []}];
      localStorage.setItem('history', JSON.stringify(newHistory))
      saveHistory(newHistory);
      return {name: userName, words: []};
  }
}

function findUserHistory(history, userName) {
  for (user in history){
    const name = history[user].name;
    const words = history[user].words;
    if (name == userName) { 
        if (!words) words = [];
        return {name, words};
    }
  }
  return null;
}

async function login() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("currentUsername", JSON.stringify(nameEl.value));

  await loadHistory();
//  configureWebSocket();

  window.location.href = "foryou.html";
}

async function saveHistory(allHistory){
  const response = await fetch('/api/update-history', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(allHistory),
  });
}

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
}