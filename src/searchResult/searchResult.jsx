import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToHistory } from '../search/search.jsx';

export function SearchResult() {
  const [force, forceUpdate] = useState("loading...");

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

  let rhymes = []
  let similars = []
  let searchOutput = []


// gets 5 rhymes and similars
  async function loadResults(){
    rhymes = await get5('rhyme',searchWord);
    similars = await get5('thesaurus',searchWord);
    postResults();

    // contact both apis. get 5 from each
    async function get5(type, thisWord) {
      let output = [0,1,2]
      const result = await fetch(`https://api.api-ninjas.com/v1/${type}?word=${thisWord}`, { headers: { 'X-Api-Key': 'Wn6+tVQwEgIWa3xpP/RLBQ==1NAqlAD6KevDFAL2'}})
      let data = await result.json();
      if (type == "thesaurus") data = data["synonyms"]; // this one's nested; rhymes are not
      if (data.length == 0) { output = []; return []; }
      for(let i = 0; i < 5; i++) {
        output[i] = data[Math.floor(Math.random()*data.length)];
        //if (output[0] == output[1] || output[0] == output[2] || output[2] == output[1]) --i;
      }
      return output;
    }
  }

  // make the SearchResult cards
  // render array with react
  async function postResults(){
    let newOutput = []
    newOutput.push(<h3 key={0}>Rhymes:</h3>);
    if (!(rhymes.length == 0)) { // if there are rhymes
      // for each word to post, a row.
      for (const i in rhymes) { 
        // add a list element w appropriate data
        newOutput.push(
          <li key={17+(i*i*503)} onClick={() => {
              const thisWord = rhymes[i];
              localStorage.setItem("currentWord", thisWord);
              addToHistory(thisWord);

              // tell everyone else you just searched it
              configureWebSocket();
              const me = JSON.parse(localStorage.getItem('currentUsername'));
              broadcastEvent(me, "search", thisWord);

              navigate("/searchResult")
              searchWord = thisWord;
              loadResults()
            }}>{rhymes[i]}
          </li>
        )
      }
    } else {    // if no history, then no table or anything. Just a message.
        newOutput.push("no rhymes found!");
    }

    newOutput.push(<h3 key={1}>Similar words:</h3>);
    if (!(similars.length == 0)) { // if there are similars
      // for each word to post, a row.
      for (const i in similars) { 
        // add a list element w appropriate data
        newOutput.push(
          <li key={773+(i*i*509)} onClick={() => {
            const thisWord = similars[i];
            localStorage.setItem("currentWord", thisWord);
            addToHistory(thisWord);

            // tell everyone else you just searched it
            configureWebSocket();
            const me = JSON.parse(localStorage.getItem('currentUsername'));
            broadcastEvent(me, "search", thisWord);

            navigate("/searchResult")
            searchWord = thisWord;
            loadResults()
          }}>{similars[i]}
          </li>
        );
      }
    } else {    // if no history, then no table or anything. Just a message.
      //newOutput.push(<ul key={67} text="No similar words found!">hi</ul>);
      newOutput.push("no similar words found!");
    }
    searchOutput = newOutput;
    forceUpdate(newOutput);
  }

  const headWord = localStorage.getItem('currentWord')
  let searchWord = localStorage.getItem('currentWord')

  React.useEffect(()=>{
    async function wrapper(){loadResults()}
    wrapper();
  },[]);
  // loadResults();
  console.log(searchOutput);

  return (
    <main className='container-fluid bg-secondary text-center'>
      <h1 id="page-header" className="fly-in">Results for: <i id="headword" className="fly-in">{headWord}</i></h1>

      <form id="search" className="fade">
        <input 
          type="text" 
          id="search-bar" 
          placeholder="Search input" 
          onChange={(e) => localStorage.setItem('currentWord',e.target.value)} 
        />
        <button type="submit" id="go-button" onClick={ async () => {
          // set currect word and move to SearchResult   
          searchWord = localStorage.getItem('currentWord')   
          if (searchWord.length) {
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


      <div className="list-card fly-in">
            <ul className='card-content'>{searchOutput}{force}</ul>
      </div>
      
    </main>
  );
}