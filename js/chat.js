
    let sendMsgBtn = document.querySelector("#send-message");
    let input = document.querySelector(".chatbox__input");

    let message = input.value;

    let chatbox = document.querySelector(".chatbox__output");

    sendMsgBtn.addEventListener("click", function(e){
        e.preventDefault();
        fetch("http://localhost:3000/api/v1/chat", {
            method: "post",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "message": input.value
            })  
        }).then(result =>{
            return result.json();
        }).then(json =>{
            console.log("sjon: "+json);
            if(json.status === "success"){
                let chatMsg = `<li class="chatbox__output-send message">
                                <div>
                                    <p class="user">${json.data.chat.user}</p>
                                    <p class="textmessage bold">${json.data.chat.message}</p>
                                </div>
                            </li>`;
                chatbox.insertAdjacentHTML("beforeend", chatMsg);
                // chatbox.appendChild(chatMsg)
            }if(json.status === "error"){
                console.log(json.message);
            }
        }).catch(error => {
            console.log("Error: ", error);
            alert(error);

        })
    })

    // let token = localStorage.getItem('token')

    // fetch("http://localhost:3000/account/user/"+token, {
    //     'headers': {
    //         'Authorization': 'Bearer ' + localStorage.getItem('token')
    //     }
    // }).then(result => {
    //     return result.json();
    // }).then(date => {


        // fetch("http://localhost:3000/account/birthday/"+date, {
        //     'headers': {
        //         'Content-Type': 'application/json'
        //     }

        // }).then(response => {
        //     return response.json();
        // }).then(response => {
        //     let namesArr = response.data.usernames
        //     let ListPeopleOnline = document.querySelector(".chatbox__ul");
        //     let amountOfUsers = namesArr.length;

        //     let amountPeopleOutput = document.querySelector("#userAmount");
        //     let amountPeople = document.createTextNode(amountOfUsers-1);
        //     amountPeopleOutput.appendChild(amountPeople);

        //     namesArr.forEach(name => {
        //         if(name != username){
        //             let listItem = document.createElement("li");
        //             listItem.setAttribute("class", "chatbox__li");
        //             let textnode = document.createTextNode(name);
        //             listItem.appendChild(textnode);
        //             ListPeopleOnline.appendChild(listItem);
        //         }

        //     });

            

        // })
        
    // }).catch(error => {
    //     console.log(error);
    // });

    