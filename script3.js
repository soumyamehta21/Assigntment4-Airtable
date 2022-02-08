const loginform = document.getElementById('loginform');


loginform.addEventListener("submit", check);

function check(e){
    e.preventDefault();
    const email = document.getElementById('email3');
    const password = document.getElementById('password3');
    let cnt = 0;

    let session = [];
    if(localStorage.getItem('session') === null){
        session = [];
    }
    else{
        session = JSON.parse(localStorage.getItem("session"));
    }

    session.forEach(function(item) {
        if(item.em === email.value && item.ps === password.value){
            location.href = 'http://127.0.0.1:5502/dashboard.html';
            item.loggedin = 1;
            cnt = 1;
        }
    });

    localStorage.setItem("session", JSON.stringify(session));

    if(cnt == 0){
        alert("Email Id & Password does not match");
        password.value = "";
    }
}