const table = document.getElementById('table');

async function fetching(){
    try{
        const url = await fetch("https://api.airtable.com/v0/appyEg2T3hHOc2gAN/Table%201?maxRecords=3&view=Grid%20view", {headers: {"Authorization": "Bearer keynhmixDus3wfxoL"}});
        const data = await url.json();
        console.log(data);
    }catch(e){
        console.log(e);
    }
}

fetching();
