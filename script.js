const table = document.getElementById('table');

async function fetching(){
    try{
        const url = await fetch("https://api.airtable.com/v0/appyEg2T3hHOc2gAN/Table%201?maxRecords=3&view=Grid%20view", {headers: {"Authorization": "Bearer keynhmixDus3wfxoL"}});
        const data = await url.json();
        // console.log(data);
        data.records.forEach((item) => { 
            // console.log(item.fields.Address);
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            let cnt = 1;
            td1.innerText = cnt;
            tr.appendChild(td1);
            cnt +=  1;
            const td2 = document.createElement('td');
            td2.innerText = item.fields.Name;
            tr.appendChild(td2);
            const td3 = document.createElement('td');
            td3.innerText = item.fields.City;
            tr.appendChild(td3);
            const td4 = document.createElement('td');
            td4.innerText = item.fields.Country;
            tr.appendChild(td4);

            const td2 = document.createElement('td');


            table.appendChild(tr);
        })
    }catch(e){
        console.log(e);
    }
}

fetching();