const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencia.json')

describe('Transferências', () => {
    describe('POST / transferencias', () => {
        let token

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        })

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$ 10,00', async () => {
            const bodyTransferencia = { ...postTransferencias }

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearear ${token}`)
                .send(bodyTransferencia)

            expect(resposta.statusCode).to.be.equal(201)
        })
        it('Deve retornar sucesso com 402 quando o valor da transferência for acima de R$ 10,00', async () => {
            const bodyTransferencia = { ...postTransferencias }
            bodyTransferencia.valor = 7

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearear ${token}`)
                .send(bodyTransferencia)

            expect(resposta.statusCode).to.be.equal(422)
        })
    })
    describe('GET/transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados quando o id for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/19')
                .set('Authorization', `Bearer ${token}`)

            console.log(resposta.body)
            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.eq(19)
            expect(resposta.body.id).to.eq('number')
            expect(resposta.body.conta_origem_id).to.eq(1)
            expect(resposta.body.valor).to.eq(10.00)
        })
    })
    describe('GET/transferencias/{id}', () => {
        it('Deve retornar retornar 10 elementos na  paginacao ', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

            console.log(resposta.body)
            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(10)
            expect(resposta.body.transferencias).to.have.lengthOf(10)
   
        })
    })
})