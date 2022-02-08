const signupform = document.getElementById('signupform');


//Session Management of an admin
signupform.addEventListener("submit", saveinlocal);
let flag = 0;

function saveinlocal(e){
    e.preventDefault();
    const email = document.getElementById('email2');
    const password = document.getElementById('password2');
    const name = document.getElementById('name2');

    let session = [], flag1 = 0;
    if(localStorage.getItem('session') === null){
        session = [];
    }else{
        session = JSON.parse(localStorage.getItem('session'));
    }

    // function check(){
    //     session.forEach(function(item){
    //         if(email.value === item.em){
    //             flag1 = 1;
    //         }
    //     })
    //     if(flag1 == 0){
    //         flag = 1;
    //         return flag;
    //     }
    // }

    // while(flag == 0){
    //     let val = check();
    //     if(val == 0){
    //         alert("Email Already Exists!");
    //         email.value = "";
    //     }
    // }

    let credential = {
        'em': email.value,
        'ps': password.value,
        'loggedin': 0,
        'name': name.value
    }

    session.push(credential);

    localStorage.setItem("session", JSON.stringify(session));

    location.href = 'http://127.0.0.1:5502/login.html';
}


