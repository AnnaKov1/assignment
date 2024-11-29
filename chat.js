const chatContainer = document.getElementById("chat-container");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        document.querySelector(".showed-user").textContent = `Welcome, ${loggedInUser.username}!`;
    } else {
        document.querySelector(".showed-user").textContent = "No user logged in.";
    }

    document.querySelector("button[type='logout']").onclick = () => {
        localStorage.removeItem("loggedInUser");
        alert("Logged out successfully!");
        window.location.href = "login.html";
    };
});

function sendMessage() {
    const message = messageInput.value;
    if (message && loggedInUser) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "border", "p-2", "mb-2");
        messageDiv.innerHTML = `
            <strong>${loggedInUser.username}</strong>: ${message} <br>
            <small>${new Date().toLocaleTimeString()}</small>
        `;

        chatContainer.appendChild(messageDiv);
        messageInput.value = "";
    } else if (!loggedInUser) {
        alert("You need to be logged in to send messages.");
    }
}
sendBtn.onclick = sendMessage;
