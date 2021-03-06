

let root = document.getElementById("root");

let logOutBtn = `<div class="logOutBtn"><button id="logOutBtn">Logga ut</button></div>`;
root.insertAdjacentHTML("afterend", logOutBtn);

// Startpage
let headerTemplate = `<div id="headerTemplate" class="header"><h1> Välkommen! </h1></div>`;

let inputField =
    `<div id="logIn" class="logIn"><h2>Logga in</h2><p>Har du ett konto? Logga in här</p>
<div><input type="text" placeholder="Användarnamn" id="userName"></div>
<div> <input type="password" placeholder="Lösenord" id="password"> </div>
<div><button id="loginBtn">Logga in</button></div>
</div></div></div>`;
let createField =
    `<div id="createField" class="createField"><h2>Skapa konto</h2><p>Om inte, Registera dig här! </p>
<div><input type="text" id="newUserName"> Användarnamn </div> 
<div><input type="password" id="newPassword"> Lösenord </div> 
<div><input type="email" id="email">Epostadress</div>
<div><input type="checkbox" id="subscribe">Ja, jag vill få nyhetsbrev</div>
<div><button id="submitBtn" type="button">Skicka</button></div></div>`

root.insertAdjacentHTML("afterbegin", createField);
root.insertAdjacentHTML("afterbegin", inputField);
root.insertAdjacentHTML("afterbegin", headerTemplate);
document.getElementById("logOutBtn").hidden = true;

// Submit and create new user
submitBtn.addEventListener("click", function () {
    console.log("click");
    let newUserInfo = {
        userName: document.getElementById("newUserName").value,
        password: document.getElementById("newPassword").value,
        email: document.getElementById("email").value,
        subscribe: document.getElementById("subscribe").checked
    };
    console.log(newUserInfo);

    fetch("https://nyhetsbrevjohanna.herokuapp.com/users/new", {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            newUserInfo
        })
    }).then((res) => res.json())
        .then(function (data) {
            console.log(data);
            if (data === "User created") {
                root.insertAdjacentHTML(`afterend`, `<div class="messageText"><p> Användare skapad, du kan nu logga in!</p></div>`);
            }
        })
});

// login user when click on loginbutton 
loginBtn.addEventListener("click", function () {
    let userInfo = {
        userName: document.getElementById("userName").value,
        password: document.getElementById("password").value
    }

    console.log("click");
    console.log(userInfo);

    fetch("https://nyhetsbrevjohanna.herokuapp.com/users/login", {
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
            if (data.loggedin === "yes") {
                console.log(data.id);
                loggedInPage(userName.value, data.id);
            }
            if (data === "error") {
                console.log("Fel användarnamn eller lösenord");
                root.insertAdjacentHTML(`afterend`, `<div class="messageText" id="errorMessage"><p> Fel användarnamn eller lösenord! Försök igen.</p></div>`);
            }
        })
});


//  --------- Page that shows when logged in-----------------
function loggedInPage(userName, id) {
    document.getElementById("createField").hidden = true;
    document.getElementById("headerTemplate").hidden = true;
    document.getElementById("logIn").hidden = true;
    document.getElementById("logOutBtn").hidden = false;

    const name = userName;
    const idUser = id;
    root.insertAdjacentHTML("afterbegin", "<div class='messageText'><h2>Välkommen, Du är nu inloggad som " + name + "!</h2></div>");
    localStorage.setItem('loggedin', "true");
    localStorage.setItem('loggedinuser', id);

    // See if user is subscribing to newsletter
    fetch("https://nyhetsbrevjohanna.herokuapp.com/users/login/user", {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            id
        })
    }).then((res) => res.json())
        .then(function (data) {
            console.log('Subscribing', data);
            changeSubscribeStatus(data);
        })
    // Creates buttons for users to change their subscribe status
    function changeSubscribeStatus(data) {
        if (data === "true") {
            console.log("Subscribes");
            root.insertAdjacentHTML(`afterend`, `<div class="messageText" id="messageYes"><p> Du prenumererar på nyhetsbrevet! Vill du avsluta din prenumeration klicka här!</p><button id="stopSubscribing" type="button"> Avsluta prenumenation</button></div>`);

            // When user clicks on stop subscribing
            stopSubscribing.addEventListener("click", function () {
                console.log("click");
                let changedStatus = "false";
                fetch("https://nyhetsbrevjohanna.herokuapp.com/users/changestatus", {
                    method: "post",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id,
                        changedStatus
                    })
                }).then((res) => res.json())
                    .then(function (data) {
                        console.log(data);
                        if (data === "Changed") {
                            console.log("status changed");
                            root.insertAdjacentHTML(`afterend`, `<div class="messageText" id="status"><p> Prenumationsstatusen är nu ändrad! !</p></div>`);
                            document.getElementById("messageYes").hidden = true;
                        }
                    })
            });
        }
        if (data === "false") {
            console.log("Does not subscribe");
            root.insertAdjacentHTML(`afterend`, `<div class="messageText" id="messageNo"><p> Du prenumererar inte på nyhetsbrevet! Vill du prenumerera på nyhetsbrevet klicka på knappen nedanför!</p> <button id="startSubscribing" type="button"> Prenumerera här</button> </div>`);

            // When user clicks on start subscribing button
            startSubscribing.addEventListener("click", function () {
                console.log("click");
                let changedStatus = "true";
                fetch("https://nyhetsbrevjohanna.herokuapp.com/users/changestatus", {
                    method: "post",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id,
                        changedStatus
                    })
                }).then((res) => res.json())
                    .then(function (data) {
                        console.log(data);
                        if (data === "Changed") {
                            console.log("status changed");
                            root.insertAdjacentHTML(`afterend`, `<div  class="messageText" id="status"><p> Prenumationsstatusen är nu ändrad!</p></div>`);
                            document.getElementById("messageNo").hidden = true;
                        }
                    })
            });
        }
    }
};

// 

// ---------- local storage  ------------- 

if (localStorage.getItem("loggedin") === "true") {
    loggedInPage(localStorage.getItem('loggedinuser'));
};


//  ------------ click on logout button ----------------
document.getElementById("logOutBtn").addEventListener("click", function () {
    localStorage.setItem("loggedin", "false");
    localStorage.setItem("loggedinuser", "");
    document.location.href = "index.html";

});