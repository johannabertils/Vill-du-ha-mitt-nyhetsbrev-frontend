

let root = document.getElementById("root");

// Startpage
function startPage() {
let headerTemplate = `<div id="headerTemplate" class="header"><h1> Välkommen! </h1></div>`;
let login = `<div id="loginText">Har du ett konto? Logga in här </div>`;
let register = `<div id="registerText">Om inte, Registera dig här! </div>`;

let inputField = `<div id="logIn" class="logIn"><input type="text" placeholder="Användarnamn" id="userName">
                  <input type="password" placeholder="Lösenord" id="password"> <button id="loginBtn">Logga in</button></div></div></div>`;
let createField = `<div id="createField"><h2>Skapa konto</h2>
<div><input type="text" id="newUserName"> Användarnamn </div> 
<div><input type="password" id="newPassword"> Lösenord </div> 
<div><input type="email" id="email">Epostadress</div>
<div><input type="checkbox" id="subscribe">Ja, jag vill få nyhetsbrev</div>
<div><button id="submitBtn" type="button">Skicka</button></div></div>`


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
    .then(function (data) {
        console.log('Request succeeded with JSON response', data);
        if (data === "Inloggad"){
            console.log("yes");
            loggedInPage(userName.value);
        }
        if (data === "fel inlogg"){
            console.log("Fel användarnamn eller lösenord");
            root.insertAdjacentHTML(`afterend`, `<div id="errorMessage"><p> Fel användarnamn eller lösenord! Försök igen.</p></div>`);
        }
      })
    // .then((json) => 
    // document.write(json == "inloggad"));
    // console.log(json));
});
}

function loggedInPage(userName) {
    document.getElementById("createField").hidden=true;
    document.getElementById("logIn").hidden=true;
    document.getElementById("headerTemplate").hidden=true;
    document.getElementById("loginText").hidden=true;
    document.getElementById("registerText").hidden=true;
    const name = userName;
    root.insertAdjacentHTML("afterend", "<p> Välkommen, Du är nu inloggad som " + name + "!</p>");
    let logOutBtn = `<div><button id="logOutBtn" type="button">Logga ut</button></div></div>`
    root.insertAdjacentHTML("afterbegin", logOutBtn);
    localStorage.setItem('loggedin', "true");
    localStorage.setItem('loggedinuser', name);
};

if (localStorage.getItem("loggedin") === "true") {
    loggedInPage(localStorage.getItem('loggedinuser'));
};

//RUN
if (("loggedin") === "true") {
    loggedInPage();
}
else {
    startPage()
}