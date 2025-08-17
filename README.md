# API de Favoritos - Desafio aiqfome

Esta é a API RESTful desenvolvida para o desafio técnico do aiqfome. O projeto gerencia clientes e suas listas de produtos favoritos, utilizando a FakeApiStore para o mesmo.

## Stack

- **Backend**: Node.js e TypeScript
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL (rodando em Docker)
- **ORM**: Prisma
- **Validação**: Zod
- **Autenticação**: JSON Web Token (JWT) e bcrypt

---

## Uma breve explicação

Na implementação desse desafio, tentei utilizar boas práticas de codificação e arquitetura afim de manter um código pouco acoplado e escalável.

Utilizei os princípios SOLID (responsabilidade única, aberto/fechado, substituição de Liskov, segregação de interfaces e inversão de dependência) afim de tornar o código mais legível e testável. Por exemplo, o serviço CreateCustomerService tem apenas a responsabilidade de criar clientes, e se algo mudar, apenas este serviço será alterado. Esse respeito à responsabilidade única está alinhado ao primeiro princípio SOLID.

Em termos de arquitetura, separei em: entidades, casos de uso, repositories e gateways. As dependências de código apontam sempre para o centro, garantindo que regras de negócio não dependam de frameworks ou bancos de dados.
Essa arquitetura proporciona: 
    
- Testabilidade: casos de uso e entidades podem ser testados sem necessidade de HTTP ou banco de dados. 
- Independência de banco de dados: a camada de domínio não depende de PostgreSQL ou da nossa ORM Prisma. Se necessário, outro banco pode ser usado. 
- Desacoplamento: os casos de uso e controladores bem estruturados também nos permitem alterar as regras de negócio, caso necessário, sem grandes complexidades.

Resolvi criar um gateway IProductApiGateway para a implementação doFakeStoreApiGateway utilizando axios para realizar requisições HTTP. Ao tratar o gateway como uma dependência, tornamos a API externa um detalhe fácil de substituir.

Em termos de stack, escolhi seguir pelo básico. Libs como zod, bcrypt e jsonwebtoken, facilitam as validações de entrada e autenticação de forma simples, concisa e possuem um amplo suporte de seus responsáveis, o que gera certa segurança em suas respectivas utilizações.

O código foi escrito em TypeScript para obter tipagem e ajudar na evitar erros em tempo de execução.

Utilizei o Express como framework por ser simples e flexível, além de ter um grande suporte, ele fornece funcionalidades básicas de web e pode ser extendido para as necessidades do projeto, caso o mesmo cresça.

Usei a lib helmet pra reduzir algumas vulnerabilidades básicas, mas conhecidas, como como
Content‑Security‑Policy, Cross‑Origin‑Opener‑Policy e X‑Frame‑Options.

E por último, mas não menos importante, foi escolhido o Swagger como lib para documentação, por possuir interatividade e facilidade de uso/implementação (além de ser a minha biblioteca favorita pra docs).

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
