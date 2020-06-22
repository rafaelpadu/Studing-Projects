class NegociacaoController{
    constructor(){
        
        let $ = document.querySelector.bind(document);
        this._inputQuantidade = $('#quantidade');
        this._inputData = $("#data");
        this._inputValor = $("#valor");
         
        this._listaNegociacoes = new Bind(
                                new ListaNegociacoes(), 
                                new NegociacoesView ($('#negociacoesView')),
                                'adiciona','esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
                new Mensagem(), 
                new MensagemView($('#mensagemView')),
                'texto');
        this._ordemAtual='';
    }
    
    adiciona(event){
        event.preventDefault();
        
        try{
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            
            this._mensagem.texto = 'Negociação criada com sucesso'
            this._limpaFormulario();
        } catch(erro){
            this._mensagem.texto = erro;
        }

    }
    importaNegociacoes(){
        let service = new NegociacaoService();
        Promise.all(
                    [service.obterNegociacaoSemana(),
                    service.obterNegociacaoSemanaAnterior(), 
                    service.obterNegociacaoSemanaRetrasada()]
        ).then(negociacoes =>{
            negociacoes
            .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
            .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso!'
        }).catch(error => this._mensagem.texto = error);
    }
        
    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso!";
    }
    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }
    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0

        this._inputData.focus();
    }
    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverteOrdem();
        }else {
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}
