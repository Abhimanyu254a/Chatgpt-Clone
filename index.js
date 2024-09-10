document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.getElementById('Q1');
    const sendButton = document.getElementById('Q2');
    const middle1 = document.querySelector('.middle_1');
    const middle2 = document.querySelector('.middle2');
    const questionDiv = document.querySelector('.question');
    const answerDiv = document.querySelector('.answer');
    const newChatButton = document.querySelector('.new_chat');
    const recommendationButtons = document.querySelectorAll('.R1, .R2, .R3, .R4');

    // Function to handle sending a question to the Flask app
    function sendQuestion(question) {
        // Display the question in the question div
        questionDiv.textContent = question;

        // Switch to middle2 view
        middle1.style.display = 'none';
        middle2.style.display = 'block';

        // Disable the send button while processing
        sendButton.disabled = true;

        // Send the question to the Flask backend
        fetch('/process_question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question })
        })
            .then(response => response.json())
            .then(data => {
                // Display the answer returned from the Flask app
                answerDiv.textContent = data.answer;

                // Enable the send button again
                sendButton.disabled = false;
            })
            .catch(error => {
                console.error('Error:', error);
                sendButton.disabled = false; // Enable the button if an error occurs
            });
    }

    // Handle send button click
    sendButton.addEventListener('click', function () {
        const userQuestion = inputBox.value.trim();
        if (userQuestion) {
            sendQuestion(userQuestion);
            inputBox.value = ''; // Clear the input box after sending
        }
    });

    // Handle recommendation button clicks
    recommendationButtons.forEach(button => {
        button.addEventListener('click', function () {
            const recommendationText = button.textContent.trim();
            sendQuestion(recommendationText);
        });
    });

    // Handle new chat button click
    newChatButton.addEventListener('click', function () {
        // Clear all chat contents
        questionDiv.textContent = '';
        answerDiv.textContent = '';

        // Switch back to middle_1 view
        middle1.style.display = 'block';
        middle2.style.display = 'none';

        // Clear the input box and re-enable the send button
        inputBox.value = '';
        sendButton.disabled = false;
    });
});
