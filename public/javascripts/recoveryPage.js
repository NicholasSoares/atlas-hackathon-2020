$(document).ready( function () {
    function btnState(btnId,inactive){
        $(`#${btnId}`).attr("disabled", inactive);
    }
    function spinerState(spinerId,inactive){
        $(`#${spinerId}`).attr("disabled", inactive);
    }

    $('#recoveryForm').submit(function(event){
        event.preventDefault();
        btnState('btnRecovery',true);
        $('#msgErr').hide();

        $.ajax({
            type: "POST",
            url: "/access/recovery",
            data: $('#recoveryForm').serialize(),
            credentials: 'same-origin',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            success: function(response){
                $('#msgSuccess').html('Um email com sua nova senha foi enviado para o endereço informado.').show();
                $('#btnRecovery').addClass('d-none');
                $('#emailDivField').hide();
            },
            error: function(xhr, status, error){
                (xhr.status !== 500 )?
                    $('#msgErr').html('Dados invalidos').show() :
                    $('#msgErr').html('Erro de Servidor, tente novamente mais tarde').show();
                btnState('btnRecovery',false);

            }
        });
    });
});

