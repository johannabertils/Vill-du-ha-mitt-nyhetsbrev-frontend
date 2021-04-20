let root = document.getElementById("root");

// Startpage
let headerTemplate = `<div class="header"><h1> Välkommen! </h1></div>`;
let loginBtn = `Har du ett konto? <button id="loginField"> Logga in här</button>`;
let register = `Om inte <button id="registerField" > Registera dig här!</button>`;

let inputField = `<div id="logIn" class="logIn"><input type="text" placeholder="Användarnamn" id="userName">
                  <input type="password" placeholder="Lösenord" id="passWord"> <button id="btn">Logga in</button><div class="btnArea"></div></div></div>`;
let createField = `<div><h2>Skapa konto</h2>
<form action="/books/add" method="post">
<div><input type="text" name="UserName"> Användarnamn </div> 
<div><input type="password" name="password"> Lösenord </div> 
<div><input type="email" name="newsletter">Epostadress</div>
<div><input type="checkbox" name="newsletter">Ja, jag vill få nyhetsbrev</div>
<div><button type="submit">spara</button></div></form></div>`

root.insertAdjacentHTML("afterbegin", register);
root.insertAdjacentHTML("afterbegin", loginBtn);
root.insertAdjacentHTML("afterbegin", headerTemplate);

// show loginfield
loginField.addEventListener("click", function showLogin() {
    root.insertAdjacentHTML("afterend", inputField);
});

// show registerfield
registerField.addEventListener("click", function showRegister() {
    root.insertAdjacentHTML("afterend", createField);
 
});

