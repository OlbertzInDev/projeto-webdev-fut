# Sistema de Gerenciamento de Jogadores de Futebol
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
## 📝 Descrição do Projeto

Este projeto é uma aplicação web Full-Stack desenvolvido Gustavo Henrique Olbertz e Marcelle Fatel Muraki para a disciplina de Desenvolimento WEB. O sistema permite o gerenciamento completo (CRUD - Create, Read, Update, Delete) de jogadores de futebol e seus respectivos pagamentos de mensalidade.

A arquitetura consiste em um backend construído como uma API REST e um frontend que consome essa API para fornecer uma interface de usuário interativa.

---

## ✨ Funcionalidades Principais

- ✅ **Cadastro de Jogadores:** Permite adicionar novos jogadores ao banco de dados.
- ✅ **Listagem de Jogadores:** Exibe todos os jogadores cadastrados.
- ✅ **Atualização de Dados:** Permite editar as informações de um jogador existente.
- ✅ **Exclusão de Jogadores:** Permite remover um jogador do sistema.
- ✅ **Validação de Dados:** O formulário impede o cadastro de jogadores com data de nascimento futura.
- ✅ **Persistência de Dados:** As informações são salvas em um banco de dados PostgreSQL.

---

## 💻 Tecnologias Utilizadas

- **Backend:**
  - **Java 17+**
  - **Spring Boot 3.x**
  - **Spring Web**
  - **Spring Data JPA**
  - **Hibernate**
  - **PostgreSQL** (Banco de Dados)
  - **Maven** (Gerenciador de Dependências)

- **Frontend:**
  - **ReactJS**
  - **Vite** (Ambiente de Desenvolvimento)
  - **Axios** (Cliente HTTP)
  - **HTML5 & CSS3**

- **Controle de Versão:**
  - **Git & GitHub**

---

## 📂 Estrutura do Repositório

Este repositório é um monorepo que contém as duas partes principais da aplicação:

```
/
├── java-application-futebol/      (Código-fonte da API em Java/Spring Boot)
└── futebol-frontend/     (Código-fonte da interface em ReactJS)
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (versão 17 ou superior)
- [Node.js e npm](https://nodejs.org/en) (versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/downloads/)

### 1. Backend (API Spring Boot)

```bash
# Clone este repositório
git clone [https://github.com/OlbertzInDev/projeto-webdev-fut.git](https://github.com/OlbertzInDev/projeto-webdev-fut.git)

# Navegue para a pasta do backend
cd projeto-webdev-fut/backend

# Configure o banco de dados
# Abra o arquivo `src/main/resources/application.properties` e
# ajuste as seguintes propriedades com suas credenciais do PostgreSQL:
# spring.datasource.url=jdbc:postgresql://localhost:5432/SEU_BANCO
# spring.datasource.username=SEU_USUARIO
# spring.datasource.password=SUA_SENHA

# Execute a aplicação
./mvnw spring-boot:run
```
O backend estará rodando em `http://localhost:8080`.

### 2. Frontend (Aplicação React)

```bash
# Abra um NOVO terminal e navegue para a pasta do frontend
cd projeto-webdev-fut/frontend

# Instale as dependências
npm install

# Execute a aplicação
npm run dev
```
A aplicação frontend estará acessível em `http://localhost:5173`.

---

## 📖 Documentação da API

A API REST segue os padrões para manipulação do recurso `Jogador`.

### Recurso: Jogador (`/api/jogadores`)

#### 1. Listar Todos os Jogadores
- **Método:** `GET`
- **URL:** `/api/jogadores`
- **Descrição:** Retorna uma lista com todos os jogadores cadastrados.
- **Resposta de Sucesso (200 OK):**
  ```json
  [
    {
      "id": 1,
      "nome": "Pelé",
      "email": "pele@example.com",
      "dataNascimento": "1940-10-23",
      "pagamentos": []
    }
  ]
  ```

#### 2. Criar um Novo Jogador
- **Método:** `POST`
- **URL:** `/api/jogadores`
- **Descrição:** Cadastra um novo jogador.
- **Corpo da Requisição (Request Body):**
  ```json
  {
    "nome": "Zico",
    "email": "zico@example.com",
    "dataNascimento": "1953-03-03"
  }
  ```
- **Resposta de Sucesso (201 Created):** O objeto do jogador criado.

#### 3. Buscar um Jogador por ID
- **Método:** `GET`
- **URL:** `/api/jogadores/{id}`
- **Descrição:** Retorna os detalhes de um jogador específico.
- **Resposta de Sucesso (200 OK):** O objeto do jogador correspondente.

#### 4. Atualizar um Jogador
- **Método:** `PUT`
- **URL:** `/api/jogadores/{id}`
- **Descrição:** Atualiza os dados de um jogador existente.
- **Corpo da Requisição (Request Body):**
  ```json
  {
    "email": "novo.email@example.com"
  }
  ```
- **Resposta de Sucesso (200 OK):** O objeto do jogador com os dados atualizados.

#### 5. Deletar um Jogador
- **Método:** `DELETE`
- **URL:** `/api/jogadores/{id}`
- **Descrição:** Remove um jogador do banco de dados.
- **Resposta de Sucesso (204 No Content):** Nenhuma resposta no corpo.

### Recurso: Pagamento

#### 1. Cadastrar um Novo Pagamento para um Jogador
- **Método:** `POST`
- **URL:** `/api/jogadores/{codJogador}/pagamentos`
- **Descrição:** Registra um novo pagamento para um jogador específico.
- **Corpo da Requisição (Request Body):**
  ```json
  {
      "ano": 2025,
      "mes": 6,
      "valor": 150.00
  }
  ```
- **Resposta de Sucesso (201 Created):** O objeto do pagamento criado.

#### 2. Listar Pagamentos de um Jogador
- **Método:** `GET`
- **URL:** `/api/jogadores/{codJogador}/pagamentos`
- **Descrição:** Retorna uma lista com todos os pagamentos de um jogador específico.
- **Resposta de Sucesso (200 OK):**
  ```json
  [
    {
      "id": 1,
      "ano": 2025,
      "mes": 6,
      "valor": 150.00
    }
  ]
  ```
## 🎯 Objetivos de Aprendizagem

Este projeto foi desenvolvido com o intuito de aplicar e consolidar os seguintes conhecimentos:

- Aplicação de conceitos da arquitetura MVC (Model-View-Controller).
- Desenvolvimento de uma API RESTful utilizando o framework Spring Boot.
- Mapeamento objeto-relacional (ORM) com Spring Data JPA e Hibernate.
- Construção de uma Single Page Application (SPA) reativa com a biblioteca ReactJS.
- Gerenciamento de estado no frontend com React Hooks (`useState`, `useEffect`).
- Comunicação assíncrona entre frontend e backend via requisições HTTP (com Axios).

## 🔮 Melhorias Futuras

Embora o projeto cumpra os requisitos propostos, algumas melhorias poderiam ser implementadas em futuras versões:

- [ ] Implementar o CRUD completo para a entidade de Pagamentos (Update e Delete).
- [ ] Adicionar paginação na API para a listagem de jogadores, melhorando a performance com grandes volumes de dados.
- [ ] Implementar um sistema de autenticação e autorização (ex: com JWT) para proteger os endpoints da API.
- [ ] Refatorar o frontend em componentes menores e mais especializados (ex: `JogadorForm`, `JogadorList`, `PagamentoItem`).
- [ ] Adicionar um tratamento de erros e estados de carregamento (loading spinners) mais robusto na interface.

---
**Autores:** [Gustavo Henrique Olbertz e Marcelle Fatel Muraki]