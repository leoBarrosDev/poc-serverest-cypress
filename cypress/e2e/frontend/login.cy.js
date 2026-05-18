import { faker } from '@faker-js/faker'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'

describe('Login Frontend', () => {

  it('Should access home page successfuly with final user', () => {
    cy.createFinalUser()
      .then(({ user }) => {
        cy.interceptLogin()
        LoginPage.login(
          user.email,
          user.password
        )

        cy.wait('@loginRequest')
          .its('response.statusCode')
          .should('eq', 200)

        cy.url()
          .should('contain', '/home')

        cy.screenshot('after-login-final-user')
        HomePage.validateLoginSuccess()
      })
  })

  it('Should access home page successfuly with admin user', () => {
    cy.createAdminUser()
      .then(({ user }) => {
        cy.interceptLogin()
        LoginPage.login(
          user.email,
          user.password
        )

        cy.wait('@loginRequest')
          .its('response.statusCode')
          .should('eq', 200)

        cy.url()
          .should('contain', '/home')

        cy.screenshot('after-login-admin')
        HomePage.validateLoginSuccess()
      })
  })

  it('Should not access home page with invalid credentials', () => {
    const email = "invalid@example.com"
    const password = "wrongpassword"

    cy.interceptLogin()
    LoginPage.login(
      email,
      password
    )

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('eq', 401)

    cy.screenshot('after-login-error')
    HomePage.validateLoginError()
  })

  it('Should not access home page with user that does not exist', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    cy.interceptLogin()
    LoginPage.login(
      email,
      password
    )

    cy.wait('@loginRequest')
      .its('response.statusCode')
      .should('eq', 401)

    cy.screenshot('after-login-error')
    HomePage.validateLoginError()
  })
})