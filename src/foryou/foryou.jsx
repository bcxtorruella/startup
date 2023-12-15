import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToHistory } from '../search/search.jsx';

export function ForYou() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = React.useState([])
  const [random,setRandom] = React.useState("Random word here");
  const [popular, setPopular] = React.useState("no one's online right now!")
  
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
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

  useEffect(()=>{
    async function loadPersonal() {
      // pick (up to) 5 random words and scramble their rhymes and similars across this list
      const history = getUserHistory();
      const words = history.words;
  
      // pick 3 random words from the words array
      let randoms = [];
      for (let i = 0; i < 5; i++) 
        randoms.push(words[Math.floor(Math.random()*words.length)]);
      
      let output = [];
      for (let i = 0; i < randoms.length; i++) output.push(await getRecommendations(randoms[i]));
  
      // scramble before posting (does this work?)
      output = shuffle(output);
  
      if (output.length) { // if there are recommendations
        // for each word to post, a row.
        let newRecs = []
        for (const i in output) { 
          for (const j in output[i]) {
            // add a list element w appropriate data
            newRecs.push(
              <li key={(i*i*69) + (420*j*j)} onClick={() => {
                const thisWord = output[i][j];
                localStorage.setItem("currentWord", thisWord);
                addToHistory(thisWord);
  
                // tell everyone else you just searched it
                configureWebSocket();
                const me = JSON.parse(localStorage.getItem('currentUsername'));
                broadcastEvent(me, "search", thisWord);
  
                navigate("/searchResult")
              }}>{output[i][j]}
              </li>
            )
          }
        }
        setRecommendations(newRecs);
      } else {    // if no history, then no table or anything. Just a message.
          setRecommendations('<h4 style={{text-align: "center"; font-weight:"normal"}}>Make searches to get recommendations</h4>');
      }
  
  }
  
  async function getRecommendations(word) {
      // get 3 rhymes
      const rhymes = await get3("rhyme", word)
  
      // get 3 similars
      const similars = await get3("thesaurus", word)
      rhymes.push(...similars);
  
      // return all in one array
      return rhymes;
  }
  
  async function get3(type, thisWord) {
    let output = [0,1,2]
    await fetch(`https://api.api-ninjas.com/v1/${type}?word=${thisWord}`, { headers: { 'X-Api-Key': 'Wn6+tVQwEgIWa3xpP/RLBQ==1NAqlAD6KevDFAL2'}})
    .then(result => result.json())
    .then( results =>{
        if (type == "thesaurus") results = results["synonyms"]; // this one's nested; rhymes are not
        if (results.length == 0) { output = []; return; }
        for(let i = 0; i < 3; i++) {
          output[i] = results[Math.floor(Math.random()*results.length)];
          if (output[0] == output[1] || output[0] == output[2] || output[2] == output[1]) --i;
        }
      }
    )
    return output;
  }
  
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle and https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex > 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }
  
  async function loadRandom() {
      // pick a random word from the dictionary
      let word = "muskrat";
      const url = "https://random-word-api.herokuapp.com/word?lang=en"
      await fetch(url).then((x) => x.json())
          .then((response) => {
              word = response[0];
              setRandom(word);
  
          });
  
  
  }
  
  async function loadPopular(){
      // consult every user's history to see which word appears the most in them all
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  
  
      // receive message from socket -- other user's broadcastEvent()
      socket.onmessage = async (event) => {
          const msg = JSON.parse(await event.data.text()); // parses what is sent by broadcastEvent()
  
          // post whatever word was sent
          setPopular(`${msg.from} just searched for ${msg.value}`);
      };
  }
  
  function getUserHistory(){
      const userHistoryText = localStorage.getItem('userHistory');
      const userHistory = JSON.parse(userHistoryText);
      return userHistory;
  }



    loadPersonal();
    loadRandom();
    loadPopular();
  },[])



  return (
    <div>
    <h1 id="page-header" className="fade">For You!</h1>
    <main className='container-fluid bg-secondary text-center' style={{display: "flex", flexDirection: "row"}}>


      <div className="list-card fade" style={{textAlign: 'left'}}>
          <h3 className="card-header">Some fun words...</h3>
          <ul className="card-content">{recommendations}</ul>
      </div>

      <div>
        <div className="page-card fade">
            <h3 className="card-header">Random Word!</h3>
            <p className="card-content" onClick={ () => {
                const thisWord = random;
                localStorage.setItem("currentWord", thisWord);
                addToHistory(thisWord);

                // tell everyone else you just searched it
                configureWebSocket();
                const me = JSON.parse(localStorage.getItem('currentUsername'));
                broadcastEvent(me, "search", thisWord);

                navigate("/searchResult");
              }
            }>{random}</p>
        </div>

        <div className="page-card fade">
            <h3 className="card-header">Recently Searched Word!</h3>
            <p className="card-content" onClick={() => {
              const strip = popular.split(" ")
              const thisWord = strip[strip.length - 1];
              localStorage.setItem("currentWord", thisWord);
              addToHistory(thisWord);
      
              // tell everyone else you just searched it
              configureWebSocket();
              const me = JSON.parse(localStorage.getItem('currentUsername'));
              broadcastEvent(me, "search", thisWord);
      
              navigate("searchResult");
            }}>{popular}</p>
        </div>
      </div>
    </main>
    </div>
  );
}