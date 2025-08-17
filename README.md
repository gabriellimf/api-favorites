# API de Favoritos - Desafio aiqfome

Esta é a API RESTful desenvolvida para o desafio técnico do aiqfome. O projeto gerencia clientes e suas listas de produtos favoritos, seguindo as melhores práticas de arquitetura de software, segurança e escalabilidade.

## Stack

- **Backend**: Node.js com TypeScript
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL (rodando em Docker)
- **ORM**: Prisma
- **Validação**: Zod
- **Autenticação**: JSON Web Token (JWT) e bcrypt

---

## Como Rodar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Passo a Passo

1.  **Após clonar o repositório, crie o arquivo de variáveis de ambiente:**
    Renomeie o arquivo `.env.example` para `.env` e configure com suas credenciais.

    O conteúdo do `.env` será:

    ```env
    POSTGRES_USER=user
    POSTGRES_PASSWORD=password
    POSTGRES_DB=database
    DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public
    PORT=3000
    JWT_SECRET=seu-secret-aqui
    ```

2.  Suba o banco de dados:

    ```bash
    docker compose up -d
    ```

3.  Instale as dependências

    ```bash
        npm install
    ```

4.  Rode as migrations

    ```bash
      npx prisma migrate dev
    ```

5.  Inicie a API

    ```bash
    npm run dev
    ```

O servidor estará disponível em http://localhost:3000

## Documentação da API

**Swagger**:

### Clientes e Autenticação

| Método   | Rota         | Descrição                    |
| :------- | :----------- | :--------------------------- |
| `POST`   | `/customers` | Cria um novo cliente         |
| `POST`   | `/login`     | Autentica o cliente          |
| `GET`    | `/profile`   | Retorna os dados do cliente  |
| `PUT`    | `/profile`   | Atualiza os dados do cliente |
| `DELETE` | `/profile`   | Deleta a conta do cliente    |

### Favoritos

| Método   | Rota                    | Descrição                                |
| :------- | :---------------------- | :--------------------------------------- |
| `POST`   | `/favorites`            | Adiciona um produto à lista de favoritos |
| `GET`    | `/favorites`            | Lista os produtos favoritos do usuário   |
| `DELETE` | `/favorites/:productId` | Remove um produto da lista de favoritos  |
