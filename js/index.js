window.onload = () => {
    let username = localStorage.getItem('username')
    let token = localStorage.getItem('token')


    // console.log(username);
    fetch("http://localhost:3000/account/user/"+token, {
        'headers': {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    }).then(date => {

        fetch("http://localhost:3000/account/birthday/"+date, {
            'headers': {
                'Content-Type': 'application/json'
            }

        }).then(response => {
            return response.json();
        }).then(response => {
            let namesArr = response.data.usernames
            let ListPeopleOnline = document.querySelector(".chatbox__ul");
            let amountOfUsers = namesArr.length;

            let amountPeopleOutput = document.querySelector("#userAmount");
            let amountPeople = document.createTextNode(amountOfUsers-1);
            amountPeopleOutput.appendChild(amountPeople);

            namesArr.forEach(name => {
                if(name != username){
                    let listItem = document.createElement("li");
                    listItem.setAttribute("class", "chatbox__li");
                    let textnode = document.createTextNode(name);
                    listItem.appendChild(textnode);
                    ListPeopleOnline.appendChild(listItem);
                }

            });

            

        })
        
    }).catch(error => {
        console.log(error);
    });
}