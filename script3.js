const loginform = document.getElementById('loginform');


loginform.addEventListener("submit", check);

function check(e){
    e.preventDefault();
    const email = document.getElementById('email3');
    const password = document.getElementById('password3');
    let match = 0, eml = 0, pass = 0;

    let session = [];
    if(localStorage.getItem('session') === null){
        session = [];
    }
    else{
        session = JSON.parse(localStorage.getItem("session"));
    }

    session.forEach(function(item) {
        if(item.em === email.value && item.ps === password.value){
            item.loggedin = 1;
            match = 1, eml = 1, pass = 1;
        }

        if(item.em === email.value){
            eml = 1;
        }
    });

    localStorage.setItem("session", JSON.stringify(session));

    if(eml === 1 && match === 0){
        alert("Email Id & Password does not match!");
        password.value = "";
    }
    else if(eml == 0 && match == 0){
        alert("Your Account Does Not Exist! Please Make A New One...");
        email.value = "";
        password.value = "";
        location.href = 'http://127.0.0.1:5502/signup.html';
    }
    else if(eml === 1 && pass === 1 && match === 1){
        location.href = 'http://127.0.0.1:5502/dashboard.html';
    }
}