# Pokemon API

## Requisitos

- [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Executando o projeto

- Instalar as dependências: execute `yarn`

- Criar arquivo `.env` na raiz do projeto e usar arquivo `.env.example` como modelo;

- Executar o comando `docker-compose up -d --build`

### Executando os testes

- **Após seguir os passos acima**, criar o arquivo `.env.test` na raiz do projeto, tomando como modelo o arquivo `.env.example`

- Executar `yarn test` para rodar os testes


# Endpoints da API

- Importar o arquivo **[Insomnia_2020-04-03.json](https://github.com/gaoliveira21/pokemon-api/tree/master/docs)** para seu insomnia.