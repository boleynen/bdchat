
// fetch("http://localhost/3000/api/v1/chat", {
//     'headers': {
//         'Authorization': 'Bearer ' + localStorage.getItem('token'),
//         'Content-Type': 'application/json;charset=UTF-8',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': '*',
//         'Access-Control-Allow-Methods': 'Content-Type'
//     }
// }).then(result => {
//     return result.json();
// }).then(json => {
//     console.log(json);
//     // console.log(localStorage.getItem('token'));
// }).catch(error =>{
//     console.log(error);
// });






let sendBtn = document.querySelector("#send-message");

if(sendBtn){
    sendBtn.addEventListener("click", function(e){

        e.preventDefault();

        fetch('http://localhost:3000/api/v1/chat', {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Methods': 'Content-Type'
            },
            body: JSON.stringify({
                "message": "est",
                "username":  "testttt"
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            if(json.status === "success"){
                alert("posted!");
            }else{
                alert("Login failed .. 😥😥");
            }
        })

    })
}