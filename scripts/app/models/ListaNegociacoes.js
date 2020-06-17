class ListaNegociacoes{
    constructor(armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha;
    }
    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }
    get negociacoes(){
        return [].concat(this._negociacoes);
    }
    esvazia(){
        this._negociacoes = [];
    }
}
class Funcionario {

    constructor(email) {
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }
}
