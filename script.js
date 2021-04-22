

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

    // login user when click on loginbutton 
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
                if (data.loggedin === "yes") {
                    console.log(data.id);
                    loggedInPage(userName.value, data.id);
                }
                if (data === "error") {
                    console.log("Fel användarnamn eller lösenord");
                    root.insertAdjacentHTML(`afterend`, `<div id="errorMessage"><p> Fel användarnamn eller lösenord! Försök igen.</p></div>`);
                }
            })
        // .then((json) => 
        // document.write(json == "inloggad"));
        // console.log(json));
    });
}

// logged in page
function loggedInPage(userName, id) {
    document.getElementById("createField").hidden = true;
    document.getElementById("logIn").hidden = true;
    document.getElementById("headerTemplate").hidden = true;
    document.getElementById("loginText").hidden = true;
    document.getElementById("registerText").hidden = true;
    let message = `<div></div>`; 
    const name = userName;
    const idUser = id;
    root.insertAdjacentHTML("afterend", "<p> Välkommen, Du är nu inloggad som " + name + idUser + "!</p>");
    let logOutBtn = `<div><button id="logOutBtn" type="button">Logga ut</button></div></div>`
    root.insertAdjacentHTML("afterbegin", logOutBtn);
    root.insertAdjacentHTML("afterbegin", message);
    localStorage.setItem('loggedin', "true");
    localStorage.setItem('loggedinuser', name);


    // See if user is subscribing to newsletter
    fetch("http://localhost:3010/users/login/user", {
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
            console.log("Premumerarar");
            root.insertAdjacentHTML(`afterend`, `<div id="messageYes"><p> Du premumenerar på nyhetsbrevet! Vill du avsluta din premenenation klicka här!</p><button id="stopSubscribing" type="button"> Avsluta prenumenation</button></div>`);
        }
        if (data === "false") {
            console.log("Premumerarar inte");
            root.insertAdjacentHTML(`afterend`, `<div id="messageNo"><p> Du premumenerar inte på nyhetsbrevet! Vill du prenumemerar på nyhetsbrevet klicka på knappen nedanför!</p> <button id="startSubscribing" type="button"> Prenumerera här</button> </div>`);
        }

        // When user clicks on stop subscribing
        stopSubscribing.addEventListener("click", function () {
            console.log("click");
            let changedStatus = "false"; 
            fetch("http://localhost:3010/users/stop", {
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
                if (data === "Changed"){
                    changeSubscribeStatus(data);
                    console.log("JA");
                }
            })
        });

    
    }
};

//local storage  

if (localStorage.getItem("loggedin") === "true") {
    loggedInPage(localStorage.getItem('loggedinuser'));
};

if (("loggedin") === "true") {
    loggedInPage();
}
else {
    startPage()
}