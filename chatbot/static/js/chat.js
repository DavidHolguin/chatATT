document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            sendMessage(message);
            userInput.value = '';
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage(message) {
        fetch('/get_response/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: `message=${encodeURIComponent(message)}`
        })
        .then(response => response.json())
        .then(data => {
            addMessage('bot', data.response);
            handleAutomations(data.response);
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function handleAutomations(response) {
        if (response.includes('agendar una cita')) {
            showAppointmentForm();
        } else if (response.includes('formulario de contacto')) {
            showContactForm();
        } else if (response.includes('notificación')) {
            sendPushNotification();
        }
    }

    function showAppointmentForm() {
        // Implementa la lógica para mostrar el formulario de cita
    }

    function showContactForm() {
        // Implementa la lógica para mostrar el formulario de contacto
    }

    function sendPushNotification() {
        OneSignal.push(function() {
            OneSignal.sendSelfNotification(
                "Título de la notificación",
                "Mensaje de la notificación",
                'https://tu-sitio-web.com'
            );
        });
    }
});