

let btnSignup = document.querySelector("#btn-signup");

btnSignup.addEventListener("click", function(){

    let username    = document.querySelector("#username-input").value;
    let password    = document.querySelector("#password-input").value;
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
        if(json.status === "success"){
            let feedback = document.querySelector(".alert");
            feedback.textContent = "sign up complete";
            feedback.classList.remove('hidden');
        }
    }).catch(error => {
        console.log(error);
    })
});

let btnLogin= document.querySelector("#btn-login");

btnLogin.addEventListener("click", function(){
    alert("ss");
})