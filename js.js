

let btnSignup = document.querySelector("#btn-signup");
let username = document.querySelector("#username-input");
let password = document.querySelector("#password-input");

btnSignup.addEventListener("click", function(){

    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success"){
            let feedback = document.querySelector(".alert");
            feedback.textContent = "sign up complete";
            feedback.classList.remove('hidden');
        }
    })
});