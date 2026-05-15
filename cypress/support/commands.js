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

      expect(response.status).to.eq(200)

      return response.body.authorization
    })
})


Cypress.Commands.add('createUser', (isAdmin = true) => {

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