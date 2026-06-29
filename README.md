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

A arquitetura deste projeto foi pensada não apenas para encontrar bugs, mas para atuar como um **motor de qualidade contínua**, evitando os maiores gargalos atuais do mercado de QA: manutenção cara, testes lentos e _flakiness_ (testes instáveis). Veja o "porquê" de cada escolha:

## ✅ 1. Separação Estrita de Responsabilidades (UI vs API)
Diferente de arquiteturas altamente acopladas, aqui isolamos completamente como a aplicação é preparada vs como ela é operada:
- **Custom Commands & API Services:** Focam puramente na orquestração pesada nos bastidores (ex: login via API e setup instantâneo de dados usando Requests).
- **Page Objects Pattern:** Lidam exclusivamente com o comportamento final da pessoa usuária (onde ela clica e o que ela vê em tela).
* **O que ganhamos?** Manutenção cirúrgica e código limpo no E2E (`LoginPage.login()`). Se o botão no Frontend mudar cor ou seletor, você só arruma a _Page_. Se o motor de token do Backend mudar sua estrutura de chaves, você ajusta o _Command_.

## ✅ 2. Setup Dinâmico e Global Teardown (Sustentabilidade)
Em nossos testes E2E, não preenchemos 10 campos de formulário na UI só para alcançar a tela que queremos testar. Consumimos as fábricas (`Factories` usando `@faker-js/faker`) para injetar o usuário ou o produto velozmente via chamadas no Backend. Contudo, gerar dados infinitos "polui" o banco.
* **O que ganhamos (Solução)?** Os arquivos de configuração (`e2e.js`) registram cada artefato que essas fábricas de dados geram na nuvem. Ao terminar da suíte, um comando de **Global Teardown** (limpeza de base) varre a API efetuando `DELETE` automático nos dados efêmeros. O banco de dados fica 100% limpo a cada nova execução automatizada, evitando sobrecarga ou sujeira.

## ✅ 3. Testes de Contrato de API (JSON Schemas)
Em vez de validar apenas dados literais e Status 200 nas suítes de API, os testes injetam a biblioteca poderosa `AJV`. Nós compilamos a documentação oficial da API e declaramos em forma de "Contrato" (arquivos de Schema).
* **O que ganhamos?** Isso atesta automaticamente que os tipos de cada objeto de retorno estão íntegros e que atributos vitais não deixaram de existir do nada num deploy. Previne as temidas "Quebras Silenciosas" que as asserções comuns não pegam.

## ✅ 4. Data-Driven Testing
Gerenciamento de massa de dados isoladas através de objetos. Permite parametrização de testes complexos sem "chumbamento" ou engessamento de credenciais.

## ✅ 5. Assertions Semânticas
Uso forte do ecosistema BDD (`expect(x).to.be`) e aliasing em promessas (fugindo do "callback hell") para que até perfis de negócio e Product Owners entendam o que está sendo exigido no comportamento da plataforma.

---

# 📋 Cenários Automatizados

# 💻 Frontend (E2E)

### URL:
https://front.serverest.dev/

---

## ✅ Cadastro de Usuário

Validação do fluxo crítico de registro de usuários.

### Cobertura:
- cadastro de usuário
- validação de mensagens de erro por campos obrigatórios não preenchidos

---

## ✅ Login e Autenticação

Validação de fluxo de autenticação da aplicação.

### Cobertura:
- login utilizando credenciais válidas
- login utilizando credenciais inválidas
- login com usuário inexistente

---

## ✅ Gestão de Carrinho

Fluxo principal da jornada de compra do usuário.
Observação:
A funcionalidade completa de conversão da lista em carrinho/checkout ainda apresenta comportamento inconsistente na aplicação ServeRest, portanto os cenários foram adaptados para validar integralmente o fluxo atualmente funcional da aplicação.

### Cobertura:
- adicionar produto a lista
- limpar lista de produtos
- fluxo de criação de usuário e produto integrando backend e frontend

---

# 🔌 API (Rest)

### Swagger:
https://serverest.dev/

---

## ✅ Autenticação

Validação de autenticação via API.

### Cobertura:
- login válido
- login com credenciais inválidas (teste sendo ignorado pois o retorno da API está em desacordo)
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
- criação d eprodutos sem autorização
- criação de produtos com token inválido

---
# 💻 Testes de API via interface gráfica

Segue abaixo um link de uma colection desenvolvida no Postman, também executando testes de serviços, todos baseados na documentação fornecida pela plataforma.

![Postman](./cypress/support/images/postman.jpeg)

<a href="https://documenter.getpostman.com/view/18794515/2sBXqRjcb9" target="_blank">Collection!</a>

---

# 💻 Instalação Descomplicada (Guia Passo a Passo)

Preparamos uma autêntica "receita de bolo" caso este seja seu primeiro contato técnico com repositórios.

### 📝 Pré-requisitos
Para abrir a "cozinha", você precisará ter 2 ferramentas globais instaladas em seu computador:
1. O **Node.js** (que processa a automação) e o **NPM** (seu gerenciador de pacotes).
   - *Verifique se possui digitando os comandos abaixo no seu Terminal (Prompt de Comando ou Bash)*:
   ```bash
   node -v
   npm -v
   ```
   *Se os resultados retornarem a numeração de uma versão (como v18.2.0), você já está pronto! Do contrário, [baixe ambos no site oficial clicando aqui](https://nodejs.org/pt-br/download).*

2. O **Git** (para baixar estruturalmente nosso projeto).

---

### 🚀 Rodando o Projeto do Zero

Com o Node instalado, abra o seu Terminal favorito e digite exatamente os passos a seguir, aguardando o processamento de cada linha:

**Passo 1:** Faça o download (clone) da pasta do projeto para a sua máquina:
```bash
git clone https://github.com/leoBarrosDev/mouts-qa.git
```

**Passo 2:** Feito o clone, solicite entrada dentro da pasta que criamos:
```bash
cd poc-serverest-cypress
```

**Passo 3:** Solicite ao NPM para buscar e instalar em massa todos os pacotes das tecnologias que usamos localmente (como o Faker, AJV e o motor base do Cypress):
```bash
npm install
```

**Passo 4:** Maravilha! Projeto instalado. Agora ordene a abertura gráfica dos testes:
```bash
npx cypress open
```

No painel (Cypress Runner) que acabou de abrir, selecione a opção **E2E Testing**, escolha o seu navegador preferido (ex: **Chrome**) e aperte no arquivo do cenário que quer ver a mágica atuar (ex: `login.cy.js` ou até rodar a pasta inteira).

> 💡 **Quer uma dica extra? Modo Terminal (Para Pipelines e Servidores)**
> Execute `npm run test:api` ou `npx cypress run` para analisar a velocidade de execução da suíte escondida, correndo em retaguarda de memória bruta para relatórios finos.

---

# 📝 Screenshots

 O Cypress registra as imagens automaticamente em caso de falhas no teste. Essas imagens são guardadas nesse diretório, muito úteis para inspeção visual de falhas e para documentação do comportamento da aplicação em diferentes cenários. Foram adicionas apenas algumas de forma direta, mesmo na ausência de falhas a título de demonstração.

---

# 📋 Vídeos

 Este diretório contém gravações em vídeo das execuções dos testes quando a opção de vídeo está habilitada no Cypress. Facilita a análise passo a passo de falhas intermitentes e a revisão do fluxo de testes.

Nenhum dos dois diretórios acima estão sendo enviados para o repositório remoto.
	
---

## ⚙️ CI/CD & Instabilidade de Ambiente (Flakiness)

Este projeto conta com uma esteira de Integração Contínua (CI) via **GitHub Actions** que executa a suíte de testes automaticamente a cada push/pull request, submetidos as branchs main e develop.

> **Nota sobre a execução em CI:** Como os testes são validados em um ambiente público de testes simulados (amplamente utilizado pela comunidade), o servidor alvo pode apresentar lentidão ou variações de resposta sob carga severa. Isso pode ocasionalmente gerar falhas intermitentes (*flakiness*) na esteira do GitHub Actions devido a *timeouts* de rede, embora a suíte de testes permaneça estável e com taxa de 100% de sucesso em execuções locais. Com o objetivo de mitigar esse problema a esteira está configurada para que uma segunda tentativa seja executada em caso de falha, isso não se aplica para execuções locais.

### Melhores práticas e critérios para retries (observação para QA Sênior)

- Nâo é algo tão simples identificar quando a falha é algo apenas relacionado a ambiente, mas podemos começar avaliando timeouts de rede, erros 5xx intermitentes da API, latência elevada e falhas de infraestrutura (DNS, rate limiting) tipicamente indicam problemas ambientais.

- Reproduzindo os testes localmente e em diferentes ambientes (local, staging, CI), se falha ocorrer apenas esporadicamente no CI público e não localmente, tende a ser flakiness e não necessariamente um Bug. A triagem pode contar com apoio de logs, stack traces, e evidências (screenshots/vídeo) para triagem.

- Gerar dadoso e não acompanhar e metrificar também seria um erro, pensando nisso seria interessante a taxa de falha por teste ao longo do tempo, tempo médio de resposta, percentuais de testes com retries acionados, e frequência de status 5xx/4xx do serviço.

- O uso das factories como ocorre no projeto é para isolar a massa de dados e tornar a mesma igualmente potente, sempre seguindo um padrão, mas não sendo a mesma

- É preciso entender que não devemos fazer o uso indiscriminadamente do retry dos testes, isso pode mascarar grandes problemas. Devemos fazer uso do retry apenas para falhas não-determinísticas claramente relacionadas à infraestrutura (timeouts/transientes). Não usar retry para assertions ou comportamentos funcionais determinísticos — esses exigem investigação imediata.
Retry pode mascarar problemas reais se não houver critérios explícitos e monitoramento. Para cada teste com retry ativado deve existir: i) justificativa documentada; ii) limite de tentativas; iii) alerta/visibilidade quando retries ocorrem frequentemente, para análise e correção da causa raiz.



![Testes executados via CI](./cypress/support/images/gitHubActions.jpeg)
![Testes executados via CI](./cypress/support/images/configRetry.jpeg)

---

## 🤝 Contribuições e Feedbacks

Este é um projeto de portfólio aberto e toda e qualquer sugestão de melhoria, crítica construtiva ou relatório de bug é super bem-vinda! 

Se você encontrou algo que possa ser otimizado (seja na estrutura dos testes, boas práticas de código, performance ou na própria pipeline), sinta-se à vontade para:
* Abrir uma **Issue** explicando a sua sugestão.
* Enviar um **Pull Request (PR)** com a sua proposta de melhoria.

Agradeço imensamente pelo seu tempo e por ajudar a evoluir este projeto! 🚀

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
│   ├── images/
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
