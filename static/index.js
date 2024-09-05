const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const messages = document.querySelector('.messages');
const chatBox = document.querySelector('.chat-box');

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (userInput.value.trim() === '') {
        return;
    }

    const userMessage = userInput.value;
    userInput.value = '';

    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('user-message');
    userMessageElement.textContent = userMessage;
    messages.appendChild(userMessageElement);

    fetch("/chat", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    })
        .then(response => response.json())
        .then(data => {
            const botMessageElement = document.createElement('div');
            botMessageElement.classList.add('bot-message');
            botMessageElement.textContent = data.response;
            messages.appendChild(botMessageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});