module.exports = {
    recovery_password_template : function ({password}){
        return `
                <h2 style="margin-bottom: 2rem;">Sistema WIGG</h2>
                <h3 style="margin-bottom: 2rem;">Uma nova senha foi solicitada para sua conta atraves do sistema WIGG.</h3>
                <p style="margin-bottom: 2rem;">Para acessar o sistema basta usar a nova senha abaixo :)</p>
                <p style="margin-bottom: 5rem;">Nova senha: <b>${password}</b><p>
                <p>Caso nao tenha solicitado uma nova senha contate o admistrador do sistema.</p>
                `;
    }
};