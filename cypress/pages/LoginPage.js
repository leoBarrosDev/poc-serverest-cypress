class LoginPage {

  elements = {
    emailInput: () => cy.get('[data-testid="email"]'),
    passwordInput: () => cy.get('[data-testid="senha"]'),
    loginButton: () => cy.get('[data-testid="entrar"]')
  }

  visit() {
    cy.visit('/login')
  }

  fillEmail(email) {
    this.elements
      .emailInput()
      .should('be.visible')
      .type(email)
  }

  fillPassword(password) {
    this.elements
      .passwordInput()
      .should('be.visible')
      .type(password)
  }

  submit() {
    this.elements
      .loginButton()
      .click()
  }

  login(email, password) {
    this.visit()
    this.fillEmail(email)
    this.fillPassword(password)
    this.submit()
  }
}

export default new LoginPage()