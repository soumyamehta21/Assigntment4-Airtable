const table = document.getElementById('table');
const container6 = document.getElementById('container6');
const butn = document.getElementById('butn');
const fontas = document.getElementById('fontas');
const container7 = document.getElementById('container7');
const popupform  = document.getElementById('popupform');
const popupform1 = document.getElementById('popupform1');
const mainmain = document.getElementById('mainmain');
const user = document.getElementById('user');
const logoutbtn = document.getElementById('logoutbtn');
const currpage = document.getElementById('currpage');
const previous = document.getElementById('previous');
const next = document.getElementById('next');

const entries = [];
// const keys = [];
// const obj = [];
let clicked, curruser, currpagecnt = 1;


//Session Management
function sessionmanage(){
    let flag = 0;
    let session = [];
    if(localStorage.getItem("session") === null){
        session = [];
    }else{
        session = JSON.parse(localStorage.getItem('session'));
    }

    session.forEach( function(item) {
        if(item.loggedin == 1){
            curruser = item.name;
            flag = 1;
            // return;
        }
    });

    if(flag == 0){
        location.href = 'http://127.0.0.1:5502/login.html';
    }

    user.innerHTML = `<i class="fas fa-user"></i> <p>${curruser}</p>`;
}

sessionmanage();


//Fetching records from API
async function fetching(){
    try{
        const url = await fetch("https://api.airtable.com/v0/appyEg2T3hHOc2gAN/Table%201?&view=Grid%20view", {headers: {"Authorization": "Bearer keynhmixDus3wfxoL"}});
        const data = await url.json();
        // let cnt = 1;
        data.records.forEach((item) => { 
            // const tr = document.createElement('tr');
            // const td1 = document.createElement('td');
            // td1.innerText = cnt;
            // tr.appendChild(td1);
            // cnt +=  1;

            // const td2 = document.createElement('td');
            // td2.innerText = item.fields.Name;
            // tr.appendChild(td2);
            
            // const td3 = document.createElement('td');
            // td3.innerText = item.fields.Address;
            // tr.appendChild(td3);
            
            // const td4 = document.createElement('td');
            // td4.innerText = item.fields.Country;
            // tr.appendChild(td4);

            // const td5 = document.createElement('td');
            // const td6 = document.createElement('button');
            // td6.setAttribute('class', 'btn');
            // td6.onclick = function() {editRow(item);};
            // td6.innerText = "Edit";
            // td5.appendChild(td6);
            // tr.appendChild(td5);

            // table.appendChild(tr);

            const single = {
                'id': item.id,
                'name': item.fields.Name,
                'address': item.fields.Address,
                'country': item.fields.Country,
                'phone': item.fields.Phone,
                'email': item.fields.Email
            }

            entries.push(single);
        })
    }catch(e){
        console.log(e);
    }

    if(currpagecnt == 1){
        previous.disabled = true;
        previous.style.opacity = "0.7";
    }
    if(currpagecnt != 1){
        previous.disabled = false;
        previous.style.opacity = "1";
    }
    if(currpagecnt != Math.floor(entries.length/7)){
        next.disabled = false;
        next.style.opacity = "1";
    }
    if(currpagecnt == Math.floor(entries.length/7)){
        next.disabled = true;
        next.style.opacity = "0.7"; 
    }

    currpage.innerText = currpagecnt;
    for(let j = currpagecnt-1; j < currpagecnt * 7; j++){
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerText = j+1;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerText = entries[j].name;
        tr.appendChild(td2);

        const td3 = document.createElement('td');
        td3.innerText = entries[j].address;
        tr.appendChild(td3);

        const td4 = document.createElement('td');
        td4.innerText = entries[j].country;
        tr.appendChild(td4);

        const td5 = document.createElement('td');
        const td6 = document.createElement('button');
        td6.setAttribute('class', 'btn');
        td6.onclick = function() {editRow(item);};

        td6.innerText = "Edit";
        td5.appendChild(td6);
        tr.appendChild(td5);

        table.appendChild(tr);
    }
}
fetching();


function callnextpage(){
    currpagecnt++;
    currpage.innerText = currpagecnt;

    if(currpagecnt == Math.floor(entries.length/7)){
        next.disabled = true;
        next.style.opacity = "0.7";
    }
    if(currpagecnt != 1){
        previous.disabled = false;
        previous.style.opacity = "1";
    }
    if(currpagecnt != Math.floor(entries.length/7)){
        next.disabled = false;
        next.style.opacity = "1";
    }
    if(currpagecnt == 1){
        previous.disabled = true;
        previous.style.opacity = "0.7";
    }


    let child = table.childNodes;
    for (const i of child) {
        if(i.nodeName === "TR"){
            i.style.display = 'none';
        }
    }


    for(let i = (currpagecnt - 1) * 7; i < (currpagecnt * 7); i++){
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerText = i+1;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerText = entries[i].name;
        tr.appendChild(td2);

        const td3 = document.createElement('td');
        td3.innerText = entries[i].address;
        tr.appendChild(td3);

        const td4 = document.createElement('td');
        td4.innerText = entries[i].country;
        tr.appendChild(td4);

        const td5 = document.createElement('td');
        const td6 = document.createElement('button');
        td6.setAttribute('class', 'btn');
        td6.onclick = function() {editRow(item);};

        td6.innerText = "Edit";
        td5.appendChild(td6);
        tr.appendChild(td5);

        table.appendChild(tr);
    }
}


function callpreviouspage(){
    currpagecnt--;
    currpage.innerText = currpagecnt;


    if(currpagecnt == 1){
        previous.disabled = true;
        previous.style.opacity = "0.7";
    }
    if(currpagecnt != 1){
        previous.disabled = false;
        previous.style.opacity = "1";
    }
    if(currpagecnt != Math.floor(entries.length/7)){
        next.disabled = false;
        next.style.opacity = "1";
    }
    if(currpagecnt == Math.floor(entries.length/7)){
        next.disabled = true;
        next.style.opacity = "0.7"; 
    }


    let child = table.childNodes;
    for(const i of child){
        if(i.nodeName === "TR"){
            i.style.display = 'none';
        }
    }


    let cnt = 1;
    for(let i = (currpagecnt - 1) * 7; i < (currpagecnt * 7); i++){
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerText = i+1;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerText = entries[i].name;
        tr.appendChild(td2);

        const td3 = document.createElement('td');
        td3.innerText = entries[i].address;
        tr.appendChild(td3);

        const td4 = document.createElement('td');
        td4.innerText = entries[i].country;
        tr.appendChild(td4);

        const td5 = document.createElement('td');
        const td6 = document.createElement('button');
        td6.setAttribute('class', 'btn');
        td6.onclick = function() {editRow(item);};

        td6.innerText = "Edit";
        td5.appendChild(td6);
        tr.appendChild(td5);

        table.appendChild(tr);
    }
}


//Popping up add agency form
function myfunc(){
    mainmain.style.opacity = '0.7';
    container6.style.display = 'flex';
}


// Popping up User Update Form
function editRow(row) {
    clicked = row.id;

    const name = document.getElementById('name1');
    name.value = row.fields.Name;
    const address = document.getElementById('address1');
    address.value = row.fields.Address;
    const country = document.getElementById('country1');
    country.value = row.fields.Country;
    const phone = document.getElementById('phone1');
    phone.value = row.fields.Phone;
    const email = document.getElementById('email1');
    email.value = row.fields.Email;
    mainmain.style.opacity = '0.7';
    container7.style.display = 'flex';
}

//Popping up user update form
// window.onclick = function(e){
//     // console.log(e.target);
//     if(e.target.classList.contains('btn')){
//         mainmain.style.opacity = '0.7';
//         // console.log(e.target.parentElement.parentElement);
//         let data = e.target.parentElement.parentElement.childNodes;
//         const num = data[0].innerText;
//         clicked = num;
//         // console.log(clicked);
//         const phone = document.getElementById('phone1');
//         phone.value = obj[num-1].phone;
//         const email = document.getElementById('email1');
//         email.value = obj[num-1].email;
//         const name = document.getElementById('name1');
//         name.value = data[1].innerText;
//         const address = document.getElementById('address1');
//         address.value = data[2].innerText;
//         const country = document.getElementById('country1');
//         country.value = data[3].innerText;
//         container7.style.display = 'flex';
//     }
// }


//Hiding the add agency form


function myfunction(){
    container6.style.display = 'none';
    mainmain.style.opacity = '1';
}


//Hiding the user upadte form
function myfunction1(){
    container7.style.display = 'none';
    mainmain.style.opacity = '1';
}


// Adding/Storing a record to the API
popupform.addEventListener("submit", saveindb);

async function saveindb(e){
    e.preventDefault();
    const name = document.getElementById('name');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const country = document.getElementById('country');
    let response = await fetch('https://api.airtable.com/v0/appyEg2T3hHOc2gAN/Table%201', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer keynhmixDus3wfxoL",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'fields':{
                "Phone": phone.value,
                "Email": email.value,
                "Country": country.value,
                "Name": name.value,
                "Address": address.value
            }
        }) 
    }).then(res => res.json()).then(data => console.log(data));
    name.value = "";
    address.value = "";
    email.value = "";
    phone.value = "";
    country.value = "";
    container6.style.display = 'none';
    mainmain.style.opacity = "1";
    location.reload();
}   


// Updating a record stored in API
popupform1.addEventListener("submit", updateindb);

async function updateindb(e){
    const name = document.getElementById('name1');
    const address = document.getElementById('address1');
    const country = document.getElementById('country1');
    const phone = document.getElementById('phone1');
    const email = document.getElementById('email1');
    console.log(clicked);
    e.preventDefault();
    let response = await fetch(`https://api.airtable.com/v0/appyEg2T3hHOc2gAN/Table%201/${clicked}`,{
        method: 'PATCH',
        headers: {
            "Authorization": "Bearer keynhmixDus3wfxoL",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'fields':{
                "Phone": phone.value,
                "Email": email.value,
                "Country": country.value,
                "Name": name.value,
                "Address": address.value
            }
        })
    }).then(res => res.json()).then(data => console.log(data));
    container7.style.display = 'none';
    mainmain.style.opacity = "1";
    location.reload();
}


// Logging out an  User
logoutbtn.addEventListener("click", logout);

function logout(){
    let session = [];
    if(localStorage.getItem("session") === null){
        session = [];
    }else{
        session = JSON.parse(localStorage.getItem('session'));
    }

    session.forEach( function(item) {
        if(item.loggedin == 1){
            item.loggedin = 0;
            return;
        }
    });

    localStorage.setItem("session", JSON.stringify(session));
    location.href = 'http://127.0.0.1:5502/login.html';
}