import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';
export class NegociacaoService{
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
    obterNegociacoes() {
        
        return Promise.all([
            this.obterNegociacaoSemana(),
            this.obterNegociacaoSemanaAnterior(),
            this.obterNegociacaoSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }
    cadastra(negociacao){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adiciona com sucesso!')
            .catch(() => {
                throw new Error('Não foi possivel adiciona a negociação')
                });   
    }
    lista(){
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                    console.log(erro);
                    throw new Error('Não foi possivel obter as negociações')})
    }
    apaga(){
        return ConnectionFactory  
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagados com sucesso!')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel apagar as negociações')
            })
    }
    importa(listaAtual){
        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !listaAtual.some(negociacaoExistente => 
                        negociacao.isEquals(negociacaoExistente)))
            )
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possivel importar as negociações');
            })

    }
}