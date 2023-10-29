function login() {
    const nameEl = document.querySelector("#email");
    localStorage.setItem("currentUsername", nameEl.value);

    // let newHistory = []
    // if (getLocalHistory()) {
    //     newHistory = makeNewHistory(nameEl.value);
    //     localStorage.setItem('history', JSON.stringify(newHistory))
    // }

    window.location.href = "foryou.html";
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
