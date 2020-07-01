// Essa classa é um metodo estatico
export class DateHelper{
    constructor(){
        throw new Error('Esta classe não pode ser instanciada')
    }
    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto))
            throw new Error('Deve estar no formtado dd-mm-aaaa');
        return new Date(...texto.split('/').reverse().map((mes,dia) => mes - dia % 2))
    }

}   
