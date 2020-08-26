

let btnSignup = document.querySelector("#btn-signup");

if(btnSignup){
    btnSignup.addEventListener("click", function(e){

        e.preventDefault(); 

        let username    = document.querySelector(".input-signup-user").value;
        let password    = document.querySelector(".input-signup-pass").value;
        let date        = document.querySelector("#date-input").value;
    
        fetch('http://localhost:3000/users/signup', {
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
            // console.log(json.status);
            // console.log(json);
            if(json.status === "success"){
                alert("Sign up complete. Please login to start chatting!");
            }else{
                alert("fail");
            }

        }).catch(error => {
            console.log("Error: ", error);
            alert(error);

        })
    });
}


