function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value;
    if (message.trim() !== "") {
        addMessage("You", message); // Add the message to the chat window
        messageInput.value = ""; // Clear the message input field
        // You can send the message to the server here (using AJAX or WebSockets)
    }
}

// Function to add a message to the chat window
function addMessage(username, message) {
    var chatMessages = document.getElementById("chat-messages");
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = "<span class='username'>" + username + ":</span> " + message;
    chatMessages.appendChild(messageDiv);
    // Automatically scroll to the bottom of the chat window
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listener for the send button
document.getElementById("send-button").addEventListener("click", function() {
    sendMessage();
});

// Event listener for pressing Enter key in the message input field
document.getElementById("message-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Example: Add some initial messages to the chat window
addMessage("User1", "Hello!");
addMessage("User2", "Hi there!");