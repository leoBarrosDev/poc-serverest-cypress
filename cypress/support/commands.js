import { faker } from '@faker-js/faker'
import { API_URL } from './constants/api'
import AuthService from './services/AuthService'
import UserService from './services/UsersService'
import UserFactory from './factories/UserFactory'
import Ajv from 'ajv'

const ajv = new Ajv({ allErrors: true })

Cypress.Commands.add('validateSchema', (schema, responseBody) => {
  const validate = ajv.compile(schema)
  const valid = validate(responseBody)
  if (!valid) {
    throw new Error('Schema validation failed: ' + ajv.errorsText(validate.errors))
  }
  expect(valid).to.be.true
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


Cypress.Commands.add('createFinalUser', () => {
  const user = UserFactory.createFinalUser()

  return UserService
    .create(user)
    .then((response) => {
      return {
        user,
        response
      }
    })
})

Cypress.Commands.add('createAdminUser', () => {
  const user = UserFactory.createAdminUser()

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

      const token = response.requestHeaders ? response.requestHeaders.authorization || response.requestHeaders.Authorization : null
      if (token) {
        const products = Cypress.env('createdProducts') || []
        Cypress.env('createdProducts', [...products, { id: response.body._id, token }])
      }

      return response.body
    })
})