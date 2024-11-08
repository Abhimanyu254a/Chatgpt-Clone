document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.getElementById('Q1');
    const sendButton = document.getElementById('Q2');
    const middle1 = document.querySelector('.middle_1');
    const middle2 = document.querySelector('.middle2');
    const newChatButton = document.querySelector('.new_chat');
    const recommendationButtons = document.querySelectorAll('.R1, .R2, .R3, .R4');
    const chatHistoryContainer = document.createElement('div');
    chatHistoryContainer.className = 'chat-history';
    middle2.insertBefore(chatHistoryContainer, middle2.firstChild);

    // Function to display user questions and bot answers
    function displayMessage(text, isUser = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'bot-message';
        messageDiv.textContent = text;
        chatHistoryContainer.appendChild(messageDiv);
        chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
    }

    // Function to handle sending a question to the Flask app
    function sendQuestion(question) {
        displayMessage(question, true);  // Display user's question
        middle1.style.display = 'none';
        middle2.style.display = 'block';
        sendButton.disabled = true;

        fetch('/process_question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question })
        })
        .then(response => response.json())
        .then(data => {
            displayMessage(data.answer, false);  // Display bot's answer
            sendButton.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('Error occurred while fetching the response.', false);
            sendButton.disabled = false;
        });
    }

    // Handle send button click event
    sendButton.addEventListener('click', function () {
        const userQuestion = inputBox.value.trim();
        if (userQuestion) {
            sendQuestion(userQuestion);
            inputBox.value = '';
        }
    });

    // Handle Enter key press for sending the message
    inputBox.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const userQuestion = inputBox.value.trim();
            if (userQuestion) {
                sendQuestion(userQuestion);
                inputBox.value = '';
            }
        }
    });

    // Handle recommendation button clicks
    recommendationButtons.forEach(button => {
        button.addEventListener('click', function () {
            const recommendationText = button.textContent.trim();
            sendQuestion(recommendationText);
        });
    });

    // Handle new chat button click to reset the conversation
    newChatButton.addEventListener('click', function () {
        chatHistoryContainer.innerHTML = '';  // Clear the chat history
        middle1.style.display = 'block';
        middle2.style.display = 'none';
        inputBox.value = '';
        sendButton.disabled = false;
    });
});
