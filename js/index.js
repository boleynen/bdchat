
fetch("http://localhost/3000/api/v1/chat", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Methods': 'Content-Type'
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(error =>{
    console.log(error);
});