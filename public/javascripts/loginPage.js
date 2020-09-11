$(document).ready( function () {
    function btnState(btnId,inactive){
        $(`#${btnId}`).attr("disabled", inactive);
    }
    function spinerState(spinerId,inactive){
        $(`#${spinerId}`).attr("disabled", inactive);
    }

    $('#loginForm').submit(function(event){
        event.preventDefault();
        btnState('btnLogin',true);
        $('#msgErr').hide();

        $.ajax({
            type: "POST",
            url: "/access",
            data: $('#loginForm').serialize(),
            credentials: 'same-origin',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            success: function(response){
                window.location.reload();
            },
            error: function(xhr, status, error){
                (xhr.status !== 500 )?
                    $('#msgErr').html('Dados invalidos').show() :
                    $('#msgErr').html('Erro de Servidor, tente novamente mais tarde').show();
                btnState('btnLogin',false);

            }
        });
    });
});