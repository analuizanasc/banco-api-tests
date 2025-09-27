const request = require('supertest');
const { expect } = require('chai');

describe('Transferências', () => {
    describe('POST / transferencias', () => {

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$ 10,00', async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    "username": "julio.lima",
                    "senha": "123456"
                })

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
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
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    "username": "julio.lima",
                    "senha": "123456"
                })

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
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