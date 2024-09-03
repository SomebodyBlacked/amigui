$(document).ready(function () {
    $('#send-button').click(function () {
        var userMessage = $('#user-input').val();
        // Aquí enviarías el mensaje al servidor usando AJAX
        $.ajax({
            type: 'POST',
            url: '/chat', // Ajusta la URL a la ruta de tu Flask
            data: JSON.stringify({ message: userMessage }),
            contentType: 'application/json',
            success: function (response) {
                // Agregar la respuesta del chatbot a la sección de mensajes
                $('.messages').append('<div class="bot-message">' + response.response + '</div>');
                $('#user-input').val('');
            }
        });
    });
});