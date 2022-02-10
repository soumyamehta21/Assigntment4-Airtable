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
const searchcountry = document.getElementById('searchcountry');
const container8 = document.getElementById('container8');
const adminupdateform = document.getElementById('adminupdateform');

const entries = [];
// const keys = [];
// const obj = [];
let clicked, curruser, currpagecnt = 1, serial = 1;


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


// Getting details of an admin from localstorage
function updateuser(){
    const name = document.getElementById('name5');
    const email = document.getElementById('email5');
    const password = document.getElementById('password5');
    const phone = document.getElementById('phone5');
    const address = document.getElementById('address5');
    const country = document.getElementById('country5'); 

    let session = [];
    if(localStorage.getItem("session") === null){
        session = [];
    }else{
        session = JSON.parse(localStorage.getItem('session'));
    }

    mainmain.style.opacity = '0.7';
    container8.style.display = 'flex';

    session.forEach((item) => {
        if(item.loggedin === 1){
            name.value = item.name;
            email.value = item.em;
            password.value = item.ps;
            phone.value = item.phone;
            address.value = item.address;
            country.value = item.country;
        }
    })
}


// Updating details of admin in localStorage
adminupdateform.addEventListener("submit", updateinlocalstorage);

function updateinlocalstorage(){
    const name = document.getElementById('name5');
    const email = document.getElementById('email5');
    const password = document.getElementById('password5');
    const phone = document.getElementById('phone5');
    const address = document.getElementById('address5');
    const country = document.getElementById('country5');

    let session = [];
    if(localStorage.getItem("session") === null){
        session = [];
    }else{
        session = JSON.parse(localStorage.getItem('session'));
    }

    session.forEach((item) => {
        if(item.loggedin === 1){
            item.name = name.value;
            item.em = email.value;
            item.ps = password.value;
            item.phone = phone.value;
            item.address = address.value;
            item.country = country.value;
        }
    })

    localStorage.setItem("session", JSON.stringify(session));

    container8.style.display = 'none';
    mainmain.style.opacity = "1";
}


//Fetching records from API
async function fetching(){
    try{
        const url = await fetch("https://api.airtable.com/v0/appyEg2T3hHOc2gAN/Table%201?&view=Grid%20view", {headers: {"Authorization": "Bearer keynhmixDus3wfxoL"}});
        const data = await url.json();
        // let cnt = 1;
        data.records.forEach((item) => { 
            const single = {
                'number': serial,
                'id': item.id,
                'name': item.fields.Name,
                'address': item.fields.Address,
                'country': item.fields.Country,
                'phone': item.fields.Phone,
                'email': item.fields.Email
            }
            serial++;
            entries.push(single);
        })
    }catch(e){
        console.log(e);
    }

    if(currpagecnt == 1){
        previous.disabled = true;
        previous.style.opacity = "0.7";
        previous.style.cursor = "not-allowed"; 
    }
    if(currpagecnt != 1){
        previous.disabled = false;
        previous.style.opacity = "1";
        previous.style.cursor = "pointer"
    }
    if(currpagecnt != Math.ceil(entries.length/7)){
        next.disabled = false;
        next.style.opacity = "1";
        next.style.cursor = "pointer"
    }
    if(currpagecnt == Math.ceil(entries.length/7)){
        next.disabled = true;
        next.style.opacity = "0.7";
        next.style.cursor = "not-allowed"; 
    }

    currpage.innerText = currpagecnt;
    for(let j = currpagecnt-1; j < currpagecnt * 7 && j < entries.length; j++){
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerText = entries[j].number;
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
        // td6.onclick = function() {editRow(item);};

        td6.innerText = "Edit";
        td5.appendChild(td6);
        tr.appendChild(td5);

        table.appendChild(tr);
    }
}
fetching();



//Popping up add agency form
function myfunc(){
    mainmain.style.opacity = '0.7';
    container6.style.display = 'flex';
}


// Popping up User Update Form
// function editRow(row) {
//     clicked = row.id;

//     const name = document.getElementById('name1');
//     name.value = row.fields.Name;
//     const address = document.getElementById('address1');
//     address.value = row.fields.Address;
//     const country = document.getElementById('country1');
//     country.value = row.fields.Country;
//     const phone = document.getElementById('phone1');
//     phone.value = row.fields.Phone;
//     const email = document.getElementById('email1');
//     email.value = row.fields.Email;
//     mainmain.style.opacity = '0.7';
//     container7.style.display = 'flex';
// }


// Popping up user update form
window.onclick = function(e){
    // console.log(e.target);
    if(e.target.classList.contains('btn')){
        // console.log(e.target.parentElement.parentElement);
        let data = e.target.parentElement.parentElement.childNodes;
        const num = data[0].innerText;
        clicked = entries[num-1].id;
        const phone = document.getElementById('phone1');
        phone.value = entries[num-1].phone;
        const email = document.getElementById('email1');
        email.value = entries[num-1].email;
        const name = document.getElementById('name1');
        name.value = data[1].innerText;
        const address = document.getElementById('address1');
        address.value = data[2].innerText;
        const country = document.getElementById('country1');
        country.value = data[3].innerText;
        mainmain.style.opacity = '0.7';
        container7.style.display = 'flex';
    }
}


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

function myfunction2(){
    container8.style.display = 'none';
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
    // console.log(clicked);
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


// Calling next page
function callnextpage(){
    currpagecnt++;
    currpage.innerText = currpagecnt;

    if(currpagecnt == Math.ceil(entries.length/7)){
        next.disabled = true;
        next.style.opacity = "0.7";
        next.style.cursor = "not-allowed"; 
    }
    if(currpagecnt != 1){
        previous.disabled = false;
        previous.style.opacity = "1";
        previous.style.cursor = "pointer"
    }
    if(currpagecnt != Math.ceil(entries.length/7)){
        next.disabled = false;
        next.style.opacity = "1";
        next.style.cursor = "pointer"
    }
    if(currpagecnt == 1){
        previous.disabled = true;
        previous.style.opacity = "0.7";
        previous.style.cursor = "not-allowed"; 
    }


    let child = table.childNodes;
    for (const i of child) {
        if(i.nodeName === "TR"){
            i.style.display = 'none';
        }
    }


    for(let i = (currpagecnt - 1) * 7; i < (currpagecnt * 7) && i < entries.length; i++){
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerText = entries[i].number;
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
        // td6.onclick = function() {editRow(item);};

        td6.innerText = "Edit";
        td5.appendChild(td6);
        tr.appendChild(td5);

        table.appendChild(tr);
    }
}


// Calling previous page
function callpreviouspage(){
    currpagecnt--;
    currpage.innerText = currpagecnt;


    if(currpagecnt == 1){
        previous.disabled = true;
        previous.style.opacity = "0.7";
        previous.style.cursor = "not-allowed"; 
    }
    if(currpagecnt != 1){
        previous.disabled = false;
        previous.style.opacity = "1";
        previous.style.cursor = "pointer"
    }
    if(currpagecnt != Math.ceil(entries.length/7)){
        next.disabled = false;
        next.style.opacity = "1";
        next.style.cursor = "pointer"
    }
    if(currpagecnt == Math.ceil(entries.length/7)){
        next.disabled = true;
        next.style.opacity = "0.7"; 
        next.style.cursor = "not-allowed"; 
    }


    let child = table.childNodes;
    for(const i of child){
        if(i.nodeName === "TR"){
            i.style.display = 'none';
        }
    }


    let cnt = 1;
    for(let i = (currpagecnt - 1) * 7; i < (currpagecnt * 7) && i < entries.length; i++){
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerText = entries[i].number;
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
        // td6.onclick = function() {editRow(item);};

        td6.innerText = "Edit";
        td5.appendChild(td6);
        tr.appendChild(td5);

        table.appendChild(tr);
    }
}


// Search according to country
function search(){
    let input = searchcountry;

    let child = table.childNodes;
    for(const i of child){
        if(i.nodeName === "TR"){
            i.style.display = 'none';
        }
    }

    if(input.value == ""){
        next.style.display = 'block';
        previous.style.display = 'block';
        currpage.style.display = 'block';
        currpage.innerText = currpagecnt;
        for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerText = entries[j].number;
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
            // td6.onclick = function() {editRow(item);};

            td6.innerText = "Edit";
            td5.appendChild(td6);
            tr.appendChild(td5);

            table.appendChild(tr);
        }
    }
    else{
        next.style.display = 'none';
        previous.style.display = 'none';
        currpage.style.display = 'none';
        for(let i = 0; i < entries.length; i++){
            if(entries[i].country.toLowerCase().startsWith(input.value.toLowerCase())){
                // console.log(entries[i].country);
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                td1.innerText = entries[i].number;
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
                // td6.onclick = function() {editRow(item);};
    
                td6.innerText = "Edit";
                td5.appendChild(td6);
                tr.appendChild(td5);
    
                table.appendChild(tr);
            }
        }
    }
}


// Sorting according to city
function sortbycountry(){
    const scountry = document.getElementById('scountry');
    
    let child = table.childNodes;
        for(const i of child){
            if(i.nodeName === "TR"){
                i.style.display = 'none';
            }
        }
    
    if(scountry.classList.contains("show")){
        scountry.innerHTML = `<i class="fas fa-arrow-down"></i>`

        entries.sort((a,b) => {
            if(a.country > b.country) return 1;
            else if(a.country < b.country) return -1;
            else return 0;
        })
    
        currpagecnt = currpage.innerText;
        for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerText = entries[j].number;
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
            // td6.onclick = function() {editRow(item);};
    
            td6.innerText = "Edit";
            td5.appendChild(td6);
            tr.appendChild(td5);
    
            table.appendChild(tr);
        }

        scountry.classList.remove("show");
    }
    else{
        scountry.innerHTML = `<i class="fas fa-arrow-up"></i>`

        entries.sort((a,b) => {
            if(a.country > b.country) return -1;
            else if(a.country < b.country) return 1;
            else return 0;
        })
    
        currpagecnt = currpage.innerText;
        for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerText = entries[j].number;
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
            // td6.onclick = function() {editRow(item);};
    
            td6.innerText = "Edit";
            td5.appendChild(td6);
            tr.appendChild(td5);
    
            table.appendChild(tr);
        }

        scountry.classList.add("show");
    }   
}


// Sorting according to city
function sortbycity(){
    const scity = document.getElementById('scity');
    
    let child = table.childNodes;
        for(const i of child){
            if(i.nodeName === "TR"){
                i.style.display = 'none';
            }
        }
    
    if(scity.classList.contains("show1")){
        scity.innerHTML = `<i class="fas fa-arrow-down"></i>`

        entries.sort((a,b) => {
            if(a.address > b.address) return 1;
            else if(a.address < b.address) return -1;
            else return 0;
        })
    
        currpagecnt = currpage.innerText;
        for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerText = entries[j].number;
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
            // td6.onclick = function() {editRow(item);};
    
            td6.innerText = "Edit";
            td5.appendChild(td6);
            tr.appendChild(td5);
    
            table.appendChild(tr);
        }

        scity.classList.remove("show1");
    }
    else{
        scity.innerHTML = `<i class="fas fa-arrow-up"></i>`

        entries.sort((a,b) => {
            if(a.address > b.address) return -1;
            else if(a.address < b.address) return 1;
            else return 0;
        })
    
        currpagecnt = currpage.innerText;
        for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
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
            // td6.onclick = function() {editRow(item);};
    
            td6.innerText = "Edit";
            td5.appendChild(td6);
            tr.appendChild(td5);
    
            table.appendChild(tr);
        }

        scity.classList.add("show1");
    }   
}


function sortbyname(){
    const sname = document.getElementById('sname');
    
    let child = table.childNodes;
        for(const i of child){
            if(i.nodeName === "TR"){
                i.style.display = 'none';
            }
        }
    
    if(sname.classList.contains("show2")){
        sname.innerHTML = `<i class="fas fa-arrow-down"></i>`

        entries.sort((a,b) => {
            if(a.name > b.name) return 1;
            else if(a.name < b.name) return -1;
            else return 0;
        })
    
        currpagecnt = currpage.innerText;
        for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerText = entries[j].number;
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
            // td6.onclick = function() {editRow(item);};
    
            td6.innerText = "Edit";
            td5.appendChild(td6);
            tr.appendChild(td5);
    
            table.appendChild(tr);
        }

        sname.classList.remove("show2");
    }
    else{
        sname.innerHTML = `<i class="fas fa-arrow-up"></i>`

        entries.sort((a,b) => {
            if(a.name > b.name) return -1;
            else if(a.name < b.name) return 1;
            else return 0;
        })
    
        currpagecnt = currpage.innerText;
        for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerText = entries[j].number;
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
            // td6.onclick = function() {editRow(item);};
    
            td6.innerText = "Edit";
            td5.appendChild(td6);
            tr.appendChild(td5);
    
            table.appendChild(tr);
        }

        sname.classList.add("show2");
    }   
}


function sortbyno(){
    const sno = document.getElementById('sno');
    
    let child = table.childNodes;
        for(const i of child){
            if(i.nodeName === "TR"){
                i.style.display = 'none';
            }
        }
    
    if(sno.classList.contains("show3")){
        sno.innerHTML = `<i class="fas fa-arrow-down"></i>`

        entries.sort((a,b) => {
            if(Number(a.number) > Number(b.number)) return 1;
            else if(Number(a.number) < Number(b.number)) return -1;
            else return 0;
        })
    
        currpagecnt = currpage.innerText;
        for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerText = entries[j].number;
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
            // td6.onclick = function() {editRow(item);};
    
            td6.innerText = "Edit";
            td5.appendChild(td6);
            tr.appendChild(td5);
    
            table.appendChild(tr);
        }

        sno.classList.remove("show3");
    }
    else{
        sno.innerHTML = `<i class="fas fa-arrow-up"></i>`

        entries.sort((a,b) => {
            if(Number(a.number) > Number(b.number)) return -1;
            else if(Number(a.number) < Number(b.number)) return 1;
            else return 0;
        })
    
        currpagecnt = currpage.innerText;
        for(let j = (currpagecnt - 1) * 7; j < (currpagecnt * 7) && j < entries.length; j++){
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerText = entries[j].number;
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
            // td6.onclick = function() {editRow(item);};
    
            td6.innerText = "Edit";
            td5.appendChild(td6);
            tr.appendChild(td5);
    
            table.appendChild(tr);
        }

        sno.classList.add("show3");
    }   
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