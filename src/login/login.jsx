import React from 'react';
import '../app.css'
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("noname");


  async function loadHistory (){  // contact service to cache user's history
    let history = {};
    // Get the latest history from the service
    fetch('https://startup.poetrymate.net/api/history.html')
      .then((response) => { history = response.json() });
    // history = await response.json();
  
    const userHistory = checkHistory(history, userName); // nothing to return right??
    localStorage.setItem('userHistory', JSON.stringify(userHistory))
  }
  
  function checkHistory(history){ // 1) caches the allHistory obj. 2) makes sure that that user does have a history obj in localStorage
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

    navigate("/foryou")
  }
  
  async function saveHistory(allHistory){
    fetch('https://startup.poetrymate.net/api/update-history', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      mode: 'no-cors',
      body: JSON.stringify(allHistory),
    });
  }
  
  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  }




  return (
    <div>
    <h1 id="page-header">Sign In</h1>

    <main className='container-fluid bg-secondary text-center'>
      
      <form id="login-card" className="fly-in">
        <div className="login-content">
            <input 
              type="text" 
              id="username" 
              placeholder="Username" 
              onChange={(e) => setUserName(e.target.value)}
           />
        </div>
        <button id="go-button" type="submit" onClick={async () => {
          localStorage.setItem("currentUsername", JSON.stringify(userName));
        
          await loadHistory();
            
          navigate("/foryou");
          }}>
            Sign in
        </button>
      </form>

    </main>
    </div>
  );
}