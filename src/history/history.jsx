import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addToHistory } from '../search/search.jsx';

export function History() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const navigate = useNavigate();
  let socket = new Promise ((resolve) => {
      const innerSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
      innerSocket.onopen = () => resolve(innerSocket);
  } 
  )
  async function configureWebSocket() {
    socket = new Promise ((resolve) => {
        const innerSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        innerSocket.onopen = () => resolve(innerSocket);
    } ) 
  
    //allow connection to open
    await delay(2000);
  }
  async function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    // while (socket.readyState == 0) { let int = 0; await setInterval(() => {let hi = 0;}, 1000) }
    (await socket).send(JSON.stringify(event)); // calls socket.onmessage for everyone else
    //this.socket.close()
  }

  //******/

  let display = [];
  function displayHistory() {
    // load the user's history object
    const history = getUserHistory();
    const words = history.words;
    
    if (words.length) { // if there is history
        // for each word searched, a row.
        for (const word of words) { 
          display.push(
            <li key={word.length*word.length*69} onClick={() => {
              const thisWord = word;
              localStorage.setItem("currentWord", thisWord);
              addToHistory(thisWord);

              // tell everyone else you just searched it
              configureWebSocket();
              const me = JSON.parse(localStorage.getItem('currentUsername'));
              broadcastEvent(me, "search", thisWord);
              
              navigate("/searchResult");
            }}>
              {word}
            </li>
          )
        }
    } else {    // if no history, then no table or anything. Just a message.
      display.push(<li key={71}>Past searches appear here</li>);
    }
  }

  function getUserHistory(){
      const userHistoryText = localStorage.getItem('userHistory');
      const userHistory = JSON.parse(userHistoryText);
      return userHistory;
  }

 displayHistory();

  return (
    <main className='container-fluid bg-secondary text-center'>
      <h1 id="page-header" className="fade">History</h1>
      <div className="list-card fade">
        <ul id="history" className="card-content">
          {display}
        </ul>
      </div>
    </main>
  );
}