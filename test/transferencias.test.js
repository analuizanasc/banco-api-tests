const request = require('supertest');
const { expect } = require('chai');
require( 'dotenv').config();
const { obterToken } = require('../helpers/autenticacao')

describe('Transferências', () => {
    describe('POST / transferencias', () => {

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$ 10,00', async () => {
            const token = await obterToken('julio.lima', '123456')

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Barear ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 10,
                    token: token
                })

            expect(resposta.statusCode).to.be.equal(201)
        })
        it('Deve retornar sucesso com 402 quando o valor da transferência for acima de R$ 10,00', async () => {
            const token = await obterToken( 'julio.lima', '123456')

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Barear ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token: token
                })

            expect(resposta.statusCode).to.be.equal(422)
        })
    })
})