// const { response } = require("express");

let btnSignup = document.querySelector("#btn-signup");

if(btnSignup){
    btnSignup.addEventListener("click", function(e){

        e.preventDefault(); 

        let username    = document.querySelector(".input-signup-user").value;
        let password    = document.querySelector(".input-signup-pass").value;
        let date        = document.querySelector("#date-input").value;
    
        fetch('http://localhost:3000/account/signup', {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Methods': 'Content-Type'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "date" : date
            })

        }).then(response => {
            return response.json();

        }).then(json => {

            if(json.status === "success"){
                alert("Sign up complete. Please login to start chatting!");

            }else if(json.status === "error_username"){
                alert("Sign up failed: " + json.message);
            }else{
                alert("Error: " + json.message);
            }

            res.redirect("/birthday/"+json.data.date);

        }).catch(error => {
            console.log("Error: ", error);
            alert(error);

        })
    });
}


