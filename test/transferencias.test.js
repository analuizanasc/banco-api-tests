const request = require('supertest');
const { expect } = require('chai');
require( 'dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencia.json')

describe('Transferências', () => {
    describe('POST / transferencias', () => {
        let token
        
        beforeEach( async ()=> {
            token = await obterToken('julio.lima', '123456')
        })

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$ 10,00', async () => {
            const bodyTransferencia = {...postTransferencias}

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Barear ${token}`)
                .send(bodyTransferencia)

            expect(resposta.statusCode).to.be.equal(201)
        })
        it('Deve retornar sucesso com 402 quando o valor da transferência for acima de R$ 10,00', async () => {
            const bodyTransferencia = {...postTransferencias}
            bodyTransferencia.valor = 7

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Barear ${token}`)
                .send(bodyTransferencia)

            expect(resposta.statusCode).to.be.equal(422)
        })
    })
})