function loadResult () {
    // get current word
    const word = localStorage.getItem("currentWord");

    // put in header
    const headwordEl = document.querySelector('#headword');
    headwordEl.textContent = word;

    // populate list of Rhymes


    // populate list of Similars

}

loadResult()