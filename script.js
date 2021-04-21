
// fetch('http://localhost:3010/users', {
//     credentials: 'same-origin'
// });

let root = document.getElementById("root");

// Startpage
let headerTemplate = `<div class="header"><h1> Välkommen! </h1></div>`;
let login = `Har du ett konto? Logga in här `;
let register = `Om inte, Registera dig här! `;

let inputField = `<div id="logIn" class="logIn"><input type="text" placeholder="Användarnamn" id="userName">
                  <input type="password" placeholder="Lösenord" id="password"> <button id="loginBtn">Logga in</button></div></div></div>`;
let createField = `<div><h2>Skapa konto</h2>
<div><input type="text" id="newUserName"> Användarnamn </div> 
<div><input type="password" id="newPassword"> Lösenord </div> 
<div><input type="email" id="email">Epostadress</div>
<div><input type="checkbox" id="subscribe">Ja, jag vill få nyhetsbrev</div>
<div><button id="submitBtn" type="button">spara</button></div></div>`


root.insertAdjacentHTML("afterbegin", createField);
root.insertAdjacentHTML("afterbegin", register);
root.insertAdjacentHTML("afterbegin", inputField);
root.insertAdjacentHTML("afterbegin", login);
root.insertAdjacentHTML("afterbegin", headerTemplate);

submitBtn.addEventListener("click", function () {
    console.log("click");
    let newUserInfo = {
        userName: document.getElementById("newUserName").value,
        password: document.getElementById("newPassword").value,
        email: document.getElementById("email").value,
        subscribe: document.getElementById("subscribe").checked
    };
    console.log(newUserInfo);

    fetch("http://localhost:3010/users/new", {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            newUserInfo
        })
    }).then((res) => res.json())

});


loginBtn.addEventListener("click", function () {
    let userInfo = {
        userName: document.getElementById("userName").value,
        password: document.getElementById("password").value
    }

    console.log("click");
    console.log(userInfo);

    fetch("http://localhost:3010/users/login", {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            userInfo
        })
    }).then((res) => res.json())
    .then((json) => console.log(json));
});
