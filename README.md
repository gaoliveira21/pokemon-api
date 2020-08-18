<h1 align="center">Pokemon API</h1>
<p align="center">
  <img src="./.github/pokemon-icon.png">
</p>

<p align="center">API desenvolvida com NodeJS para CRUD de Pokemons</p>

## :rocket: Features

- [X] Cadastro e autenticação de usuários
- [X] Upload de avatar do pokemon
- [X] Atualização de dados do usuário
- [X] Listagem de pokemons
- [X] Detalhes de um pokemon expecífico
- [X] Cadastro de pokemons
- [X] Atualização de pokemons
- [X] Exclusão de pokemons

## :hammer_and_wrench: Tecnologias

- [NodeJS](https://nodejs.org/en/);
- [MongoDB](https://www.mongodb.com/);
- [Docker](https://www.docker.com/);
- [ApiDoc](https://apidocjs.com/);
- [Jest](https://jestjs.io/).

### :computer: Requisitos

- [NodeJS](https://nodejs.org/en/);
- [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable);
- [Docker](https://docs.docker.com/get-docker/);
- [Docker Compose](https://docs.docker.com/compose/install/).

### ⚙️ Como executar a aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/gaoliveira21/pokemon-api.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd pokemon-api

# Instalar as dependências
$ yarn

# Criar arquivo .env na raiz do projeto usando o arquivo .env.example como modelo
$ cp .env.example .env # Unix
$ copy .env.example .env # Windows

# Iniciando os containers
$ docker-compose up -d --build

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

### :wrench: Executando os testes

```bash
# Criar arquivo .env.test seguindo como modelo o arquivo .env.example
$ cp .env.example .env # Unix
$ copy .env.example .env # Windows

# Executando os testes
$ yarn test
```

---

### :clipboard: Documentação

- Com a aplicação em execução acesse http://localhost:3333/docs

- Importar o arquivo **[Insomnia_2020-04-03.json](https://github.com/gaoliveira21/pokemon-api/tree/master/docs)** para seu insomnia.

---

### :memo: License
Esse projeto está sob MIT license. Veja [LICENSE](https://github.com/gaoliveira21/bootcamp-gostack-fastfeet-api/blob/master/LICENSE.md) para mais informações.

---

:construction_worker: Feito por **Gabriel Oliveira** :smiley: - **Contato:** <a href="https://www.linkedin.com/in/gabriel-jos%C3%A9-de-oliveira-633962197/">Linkedin</a>
