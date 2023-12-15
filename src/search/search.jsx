import React from 'react';
import '../app.css'
import { useNavigate } from 'react-router-dom';

export function Search() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';

  const navigate = useNavigate();
  const [searchWord, setSearchWord] = React.useState("")
  const [socket, setSocket] = React.useState(
    new Promise ((resolve) => {
      const innerSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
      innerSocket.onopen = () => resolve(innerSocket);
  } )
  )

  async function configureWebSocket() {
    setSocket(new Promise ((resolve) => {
        const innerSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        innerSocket.onopen = () => resolve(innerSocket);
    } ) )
  
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
    (await socket).send(JSON.stringify(event)); // calls socket.onmessage for everyone else
    //this.socket.close()
  }

  return (
    <div>
    <h1 id="page-header" className="fade">Search</h1>

    <main className='container-fluid bg-secondary text-center'>

      <form id="search" className="fade">
        <input 
          type="text" 
          id="search-bar" 
          placeholder="Search input" 
          //TODO: this will stately replace DOM getting text
          onChange={(e) => setSearchWord(e.target.value)} 
        />
        <button type="submit" id="go-button" onClick={ async () => {
          // set currect word and move to SearchResult      
          if (searchWord.length) {
              localStorage.setItem("currentWord", searchWord);
              addToHistory(searchWord); 
      
              // tell everyone else you just searched it
              configureWebSocket();
              const me = JSON.parse(localStorage.getItem('currentUsername'));
              broadcastEvent(me, "search", searchWord);
      
              // display results
              navigate("/searchresult");
          }
        }}>Search</button>
      </form>
    </main>
    </div>
  );
}

export async function addToHistory(word) {
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
  for (let i in newAllHistory) {
      if (newAllHistory[i].name == userName) {
          newAllHistory[i].words = words;
      }
  }

  // update userHistory
  localStorage.setItem("userHistory", JSON.stringify(history));

  // update all history
  localStorage.setItem('history', JSON.stringify(newAllHistory))

  // update the service
  await fetch('https://startup.poetrymate.net/api/update-history', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newAllHistory),
      mode: 'no-cors'
    });
}

function getUserHistory(){
  const userHistoryText = localStorage.getItem('userHistory');
  const userHistory = JSON.parse(userHistoryText);
  return userHistory;
}




