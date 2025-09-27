# Banco API Tests

## Objetivo

Este projeto tem como objetivo automatizar testes de API REST para o
sistema [Banco API](https://github.com/juliodelimas/banco-api).\
Ele valida endpoints do sistema e contribui com a qualidade e
confiabilidade do produto.

------------------------------------------------------------------------

## Stack Utilizada

-   **Linguagem**: JavaScript (Node.js)
-   **Framework de Testes**: [Mocha](https://mochajs.org/)
-   **Biblioteca de Asserções**: [Chai](https://www.chaijs.com/)
-   **Requisições HTTP**:
    [Supertest](https://github.com/visionmedia/supertest)
-   **Relatórios de Testes**:
    [Mochawesome](https://github.com/adamgruber/mochawesome)

------------------------------------------------------------------------

## Estrutura de Diretórios

    banco-api-tests/
    ├── fixtures/           # apoio
    ├── helpers/            # auxiliares
    ├── test/               # Casos de teste organizados por funcionalidade
    ├── mochawesome-report/ # Relatórios HTML gerados após execução dos testes
    ├── package.json        # Dependências e scripts
    └── .env                # Variáveis de ambiente (não versionado)

------------------------------------------------------------------------

## Configuração do Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

    BASE_URL=http://localhost:3000

> A variável `BASE_URL` define o endpoint base da API a ser testada.

------------------------------------------------------------------------

## Instalação e Execução dos Testes

### 1. Instalar dependências

``` bash
npm install
```

### 2. Executar os testes

``` bash
npm test
```

### 3. Gerar relatório HTML com Mochawesome

Após a execução dos testes, o relatório será gerado automaticamente no
diretório:

    ./mochawesome-report/mochawesome.html

Abra o arquivo em um navegador para visualizar os resultados.

------------------------------------------------------------------------

## Links Úteis - Documentação das Dependências

-   [Mocha](https://mochajs.org/)
-   [Chai](https://www.chaijs.com/)
-   [Supertest](https://github.com/visionmedia/supertest)
-   [Mochawesome](https://github.com/adamgruber/mochawesome)
