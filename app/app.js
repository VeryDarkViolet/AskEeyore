var client;

$(document).ready( function() {
    app.initialized()
        .then(function(_client) {
            client = _client;
          client.events.on('app.activated',
            function() {
                client.data.get('contact')
                    .then(function(data) {
                        $('#apptext').text("Created by " + data.contact.name);
                        $('#originatorEmail').val(data.contact.email);
                    })
                    .catch(function(e) {
                        console.log('Exception - ', e);
                    });
                client.data.get('ticket')
                    .then(function(data) {
                        $('#ticketNumber').text(data.ticket.id);
                        $('#statusCode').text(data.ticket.status);
                    })
                    .catch(function(e) {
                        console.log('Exception - ', e);
                    });
        });
    });
});

function sendMessageToOriginator() {
    Email.send({
        Host : "smtp.gmail.com",
        Username : "steve@patientsknowbest.com",
        Password : "hjdhynmquhwpgyau", // Short-term "app password"
        To : $("#originatorEmail").val(),
        From : "eeyoreOnFD@patientsknowbest.com",
        Subject : "FD-"+$("#ticketNumber").text(),
        Body : $("#messageBody").val()})
        .catch(function(e) {
           alert('Exception - ', e);
        })

    client.data.get('ticket')
        .then (function(data) {
            client.interface.trigger("setValue",{id: "status", value: 2})
                .then(function() {
                    client.interface.trigger("WTF");
                })
        })
        .catch(function(e) {
            alert('Exception - ', e);
        });

}



