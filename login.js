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

function makeNewHistory(forUser) {
    return {name: forUser, history: []};    
}

