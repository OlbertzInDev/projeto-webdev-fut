# Sistema de Gerenciamento de Jogadores de Futebol

## 📝 Descrição do Projeto

Este projeto é uma aplicação web Full-Stack desenvolvida para a disciplina de [Nome da Matéria]. O sistema permite o gerenciamento completo (CRUD - Create, Read, Update, Delete) de jogadores de futebol e seus respectivos pagamentos de mensalidade.

A arquitetura consiste em um backend construído como uma API REST e um frontend que consome essa API para fornecer uma interface de usuário interativa.

---

## ✨ Funcionalidades Principais

- ✅ **Cadastro de Jogadores:** Permite adicionar novos jogadores ao banco de dados.
- ✅ **Listagem de Jogadores:** Exibe todos os jogadores cadastrados.
- ✅ **Atualização de Dados:** Permite editar as informações de um jogador existente.
- ✅ **Exclusão de Jogadores:** Permite remover um jogador do sistema.
- ✅ **Validação de Dados:** O formulário impede o cadastro de jogadores com data de nascimento futura.
- ✅ **Persistência de Dados:** As informações são salvas em um banco de dados PostgreSQL.

*(Futuramente, a funcionalidade de pagamentos pode ser expandida na interface)*

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
├── backend/      (Código-fonte da API em Java/Spring Boot)
└── frontend/     (Código-fonte da interface em ReactJS)
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (versão 17 ou superior)
- [Node.js e npm](https://nodejs.org/en) (versão LTS recomendada)
- [PostgreSQL](