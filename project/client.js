//establishing a Socket.IO connection to a server running at http://localhost:8000.
const socket = io('http://localhost:8000');

//selecting various HTML elements (body, chatBox, onUsers, messageContainer, form, and messageInput) for manipulation in the document.
const body = document.querySelector('.container');
const chatBox = document.getElementById('chatContainer');
const onUsers = document.getElementById('onUsers');
const messageContainer = document.getElementById('chatting')
const form = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

//prompting the user to enter their name and stores it in the 'name' variable.
const name = prompt('Enter your name to Join');

//checking if the entered name is either null or has a length less than or equal to 3 characters. 
if (name === null || name.length <= 3) {
    //it creates an h1 element with a message indicating denied access, removeing the chatBox from the document, appends the h1 element to the body
    const h1Element = document.createElement('h1');
    h1Element.classList.add('noAccess');
    h1Element.innerText = 'Sorry, You are not Allowed to access the chat room. Please try again with a valid name.';
    chatBox.remove();
    body.append(h1Element);
    //alert saying 'Access Denied'. 
    alert('Access Denied');
} else {
    //'Access Granted' and emits a 'new-user-joined' event with the user's name using the established Socket.IO connection.
    alert('Access Granted');
    socket.emit('new-user-joined', name)//add comments later 
}

//listens for a 'userIncrement' event from the Socket.IO server and updates the inner text of an HTML element with the id 'onUsers' based on the received data.
socket.on('userIncrement', data => {
    onUsers.innerText = data
})

const appendAction = (message, position) => {//function `appendAction`
    //new message element with a paragraph element containing the specified message and position
    //appends it to the 'messageContainer' element, and ensures the container is scrolled to the bottom.
    const messageElement = document.createElement('div');
    const pElement = document.createElement('p');
    pElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement.append(pElement);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

//appends a message element to the 'messageContainer' with a specified message, user, position, and unique id.
const appendMessage = (message, user, position, id) => {
    const messageElement = document.createElement('div');
    const span = document.createElement('span');
    const i = document.createElement('i');
    const p = document.createElement('p');
    i.classList.add('fa-solid');
    i.classList.add('fa-heart');
    p.innerText = message;
    span.innerText = user;
    messageElement.append(span)
    messageElement.append(i)
    messageElement.append(p);
    messageElement.classList.add(position)
    messageElement.classList.add('message')
    messageElement.setAttribute('id', id)
    messageElement.setAttribute('ondblclick', "likedMessage(this.id)");

    //The 'messageContainer' is then scrolled to the bottom.
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

//when user join
socket.on('user-joined', data => {
    appendAction(`${data.name} Joined the Chat`, 'center')
    onUsers.innerText = data.onUsers
})

//when user send message to server send message to all user
socket.on('receive',data =>{
    appendMessage(data.message,data.name,'left',data.id)
})

// if message is liked then implement the styling
const likedMessage = (id)=>{
    const likedElement = document.getElementById(id);
    likedElement.classList.add('liked');
    socket.emit('liked',id)
}

// if message is liked then implement the styling
socket.on('msg-like',id =>{
    const likedElement = document.getElementById(id);
    likedElement.classList.add('liked');
})

// when user disconnect from server then disconnect message should be shown
socket.on('disconnected',data =>{
    appendAction(`${data.name} left the Chat`,'center')
    onUsers.innerHTML = data.onUsers
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    //if message is nothing then return nothing
    if (message === "") {
        return
    }
    const id = Math.round(Math.random() * 100000);
    appendMessage(message, 'You', 'right', id);
    socket.emit('send', { message, id })
    messageInput.value = "";
})
