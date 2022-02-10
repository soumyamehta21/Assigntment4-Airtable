const signupform = document.getElementById('signupform');


//Session Management of an admin
signupform.addEventListener("submit", saveinlocal);
let flag = 0;

function saveinlocal(e){
    e.preventDefault();
    const email = document.getElementById('email2');
    const password = document.getElementById('password2');
    const name = document.getElementById('name2');
    let emil = 0;

    let session = [], flag1 = 0;
    if(localStorage.getItem('session') === null){
        session = [];
    }else{
        session = JSON.parse(localStorage.getItem('session'));
    }


    let credential = {
        'em': email.value,
        'ps': password.value,
        'loggedin': 0,
        'name': name.value
    }

    session.forEach(function(item){
        if(email.value === item.em){
            emil = 1;
        }
    })

    if(emil === 1){
        alert("Email Id Already Exists! Please try new one...")
        email.value = "";
        password.value = "";
    }
    else{
        session.push(credential);
        localStorage.setItem("session", JSON.stringify(session));
        location.href = 'https://soumyamehta21.github.io/Assigntment4-Airtable/login.html';
    }
}


