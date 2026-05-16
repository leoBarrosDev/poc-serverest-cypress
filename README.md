# 🚀 Desafio Técnico: Analista de Testes Senior

<div align="center">

![Cypress](https://img.shields.io/badge/Cypress-Testing-brightgreen?style=for-the-badge&logo=cypress)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![Page Objects](https://img.shields.io/badge/Page_Objects-Architecture-blue?style=for-the-badge)
![API Rest](https://img.shields.io/badge/API-REST-orange?style=for-the-badge)
![E2E Testing](https://img.shields.io/badge/E2E-Testing-purple?style=for-the-badge)

</div>

---

# 📝 Apresentação da Atividade

Este projeto representa a entrega técnica para a avaliação de **Analista de Testes Senior**.

O foco central foi o desenvolvimento de uma suíte de testes automatizados para a plataforma **ServeRest**, abrangendo as camadas de interface (**Frontend**) e serviços (**API**).

Como profissional Senior, a arquitetura foi pensada para ser:

- escalável
- reutilizável
- desacoplada
- de fácil manutenção

Aplicando padrões de engenharia de software que garantem:

- confiabilidade do pipeline de qualidade
- rápida identificação de regressões
- facilidade de evolução da automação

---

# 🏗️ Estratégia e Padrões de Projeto

## ✅ Page Objects Pattern (PoP)

Implementado para desacoplar a lógica de teste da estrutura HTML, garantindo maior manutenibilidade e reutilização de código.

---

## ✅ Custom Commands

Abstração de comportamentos repetitivos para tornar os testes mais limpos, legíveis e reutilizáveis.

---

## ✅ Data-Driven Testing

Gerenciamento de massa de dados através de `factories`, permitindo testes parametrizados e maior flexibilidade.

---

## ✅ Assertions

Escrita de assertions claras e semânticas para facilitar entendimento e manutenção dos testes.

---

# 📋 Cenários Automatizados

# 💻 Frontend (E2E)

### URL:
https://front.serverest.dev/

---

## ✅ Cadastro de Usuário

Validação do fluxo crítico de registro de usuários.

### Cobertura:
- cadastro de usuário final
- cadastro de usuário administrador
- validação de mensagens de erro por campos obrigatórios não preenchidos

---

## ✅ Login e Autenticação

Validação de fluxo de autenticação da aplicação.

### Cobertura:
- login utilizando credenciais válidas
- login utilizando credenciais inválidas

---

## ✅ Gestão de Carrinho

Fluxo principal da jornada de compra do usuário.
Observação:
A funcionalidade completa de conversão da lista em carrinho/checkout ainda apresenta comportamento inconsistente na aplicação ServeRest, portanto os cenários foram adaptados para validar integralmente o fluxo atualmente funcional da aplicação.

### Cobertura:
- adicionar produto a lista
- limpar lista de produtos

---

# 🔌 API (Rest)

### Swagger:
https://serverest.dev/

---

## ✅ Autenticação

Validação de autenticação via API.

### Cobertura:
- login
- extração de bearer token
- validação de retorno

---

## ✅ Gestão de Usuários

Operações CRUD de usuários.

### Cobertura:
- criar usuário
- consultar usuário
- editar usuário
- remover usuário

---

## ✅ Catálogo de Produtos

Validação de endpoints protegidos de produtos.

### Cobertura:
- criação autenticada
- listagem de produtos

---

# 💻 Clonando projeto

1. Clone o repositório para a sua máquina:
```bash
git clone https://github.com/leoBarrosDev/mouts-qa.git
```
2. Acesse a pasta do projeto:
```bash
cd mouts-qa
```
3. Instale as dependências do projeto:
```bash
npm install
```
4. Inicie o Cypress na interface gráfica:
```bash
npx cypress open
```
Caso queira executar os testes, mas não em modo gráfico, basta executar o comando abaixo:
```bash
npx cypress run
```
5. No Cypress Test Runner, selecione o arquivo de teste ou a pasta desejada para executar os cenários.

---

# 📝 Screenshots

 O Cypress registra as imagens automaticamente em caso de falhas no teste. Essas imagens são guardadas nesse diretório, muito úteis para inspeção visual de falhas e para documentação do comportamento da aplicação em diferentes cenários. Foram adicionas apenas algumas de forma direta, mesmo na ausência de falhas a título de demonstração.

---

# 📋 Vídeos

 Este diretório contém gravações em vídeo das execuções dos testes quando a opção de vídeo está habilitada no Cypress. Facilita a análise passo a passo de falhas intermitentes e a revisão do fluxo de testes.

Nenhum dos dois diretórios acima estão sendo enviados para o repositório remoto.
	
---

# 📁 Arquitetura do Projeto

```bash
cypress/
│
├── e2e/
│   ├── api/
│   └── frontend/
├── screenshots/
├── support/
│   ├── constants/
│   ├── factories/
│   ├── pages/
│   ├── services/
│   ├── commands.js
│   └── e2e.js
├── videos/
node_modules/
│
├── .gitignore
├── cypress.config.js
├── package-lock.json
├── package.json
├── README.md
└── styles.css