
let sendMsgBtn = document.querySelector("#send-message");
let input = document.querySelector(".chatbox__input");

let message = input.value;

let chatbox = document.querySelector(".chatbox__output");

let username = localStorage.getItem('username')
let token = localStorage.getItem('token')

   
   const getChats = 
    fetch("http://localhost:3000/account/user/"+token, {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(result => {
            return result.json();
    }).then(date => {
        let finalDate = date.substring(0,10);
        fetch(`http://localhost:3000/api/v1/chat/${finalDate}`, {
            'headers': {
                'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(result => {
            return result.json();
        }).then(json =>{
            if(json.status === "success"){
                let chatMessage = json.data.chat
                chatMessage.forEach(chat => {
                    if(chat.user === username){
                        let chatMsg = 
                        `<li class="chatbox__output-send message">
                            <div>
                                <p class="user">${chat.user}</p>
                                <p class="textmessage bold">${chat.message}</p>
                            </div>
                        </li>`
                        chatbox.insertAdjacentHTML("beforeend", chatMsg);
                    }else{
                        let chatMsg = 
                        `<li class="chatbox__output-received message">
                            <div>
                                <p class="user">${chat.user}</p>
                                <p class="textmessage bold">${chat.message}</p>
                            </div>
                        </li>`
                        chatbox.insertAdjacentHTML("beforeend", chatMsg);
                    }

                });
            }

            if(json.status === "error"){
                console.log(json.message);
            }
        })

    }).catch(err => {
            console.log(err);
    });


    const postChats = 
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
            if(json.status === "success"){
                let chatMsg = `<li class="chatbox__output-send message">
                                <div>
                                    <p class="user">${json.data.chat.user}</p>
                                    <p class="textmessage bold">${json.data.chat.message}</p>
                                </div>
                            </li>`;
                chatbox.insertAdjacentHTML("beforeend", chatMsg);
            }if(json.status === "error"){
                console.log(json.message);
            }
        }).catch(error => {
            console.log("Error: ", error);
            alert(error);

        })
    });

    Promise.all([getChats, postChats]).then((values) => {
        // console.log(values)
    })
