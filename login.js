function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("currentUsername", nameEl.value);

    let newHistory = []
    if (getLocalHistory() == []) {
        newHistory = makeNewHistory(nameEl.value);
        localStorage.setItem('history', JSON.stringify(newHistory))
    }

    window.location.href = "foryou.html";
  }
  
function makeNewHistory(forUser) {
    return {name: forUser, history: []};    
}