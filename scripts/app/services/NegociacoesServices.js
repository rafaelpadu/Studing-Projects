class NegociacaoService{
    constructor(){
        this._http = new HttpService();
    }
    obterNegociacaoSemana(){
        return new Promise((resolve,reject) =>{
            this._http
                .get('negociacoes/semana')
                .then(negociacoes =>{
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possivel obter as negociações da semana');
                })
        });
    }
    obterNegociacaoSemanaAnterior(){
        return new Promise((resolve,reject) =>{
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes =>{
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                        console.log(erro);
                        reject('Não foi possivel obter as negociações da semana anterior.');
                })
            });
        }
    obterNegociacaoSemanaRetrasada(){
        return new Promise((resolve,reject) =>{
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes =>{
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possivel obter as negociações da semana retrasada');
                })
        });
    }
}
