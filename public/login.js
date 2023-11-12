function login() {
    const nameEl = document.querySelector("#username");
    localStorage.setItem("currentUsername", nameEl.value);


    window.location.href = "foryou.html";
  }
