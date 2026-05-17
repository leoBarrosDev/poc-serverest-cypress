import { faker } from '@faker-js/faker'
import { API_URL } from './constants/api'
import LoginPage from './pages/LoginPage'
import AuthService from './services/AuthService'
import UserService from './services/UsersService'


Cypress.Commands.add('login', (email, password) => {
  LoginPage.login(email, password)
})

Cypress.Commands.add('interceptLogin', () => {
  cy.intercept(
    'POST',
    `${API_URL}/login`
  ).as('loginRequest')
})


Cypress.Commands.add('loginApi', (email, password) => {
  return AuthService
    .login(email, password)
    .then((response) => {
      expect(response.status, 'Login response status').to.eq(200)
      expect(
        response.body.authorization,
        'Authorization token'
      ).to.not.be.empty
      return response.body.authorization
    })
})


Cypress.Commands.add('createFinalUser', (isAdmin = false) => {
  const user = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: '123456',
    administrador: isAdmin.toString()
  }

  return UserService
    .create(user)
    .then((response) => {
      return {
        user,
        response
      }
    })
})

Cypress.Commands.add('createAdminUser', (isAdmin = true) => {
  const user = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: '123456',
    administrador: isAdmin.toString()
  }

  return UserService
    .create(user)
    .then((response) => {
      return {
        user,
        response
      }
    })
})

Cypress.Commands.add('createProductViaAPI', (email, password, productName) => {
  // ensure product name is unique to avoid "Já existe produto com esse nome" errors
  const productNome = productName ? `${productName} ${Date.now()}` : `${faker.commerce.product()} ${Date.now()}`

  return AuthService
    .login(email, password)
    .then((response) => {
      const token = response.body.authorization
      return cy.request({
        method: 'POST',
        url: `${API_URL}/produtos`,
        headers: {
          // provide token in common header names to match API expectations
          Authorization: token,
          authorization: token
        },
        body: {
          nome: productNome,
          preco: 100,
          descricao: 'Produto criado via API para teste E2E',
          quantidade: 10
        }
      })
    })
    .then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      expect(response.body._id).to.not.be.empty
      return response.body
      
    })
})