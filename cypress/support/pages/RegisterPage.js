class RegisterPage {

  elements = {
    nomeInput: () => cy.get('[data-testid="nome"]'),
    emailInput: () => cy.get('[data-testid="email"]'),
    passwordInput: () => cy.get('[data-testid="password"]'),
    cadastrarButton: () => cy.get('[data-testid="cadastrar"]'),
    checkboxAdmin: () => cy.get('[data-testid="checkbox"]'),
    messageCreateUser: () => cy.get('[data-testid="message"]'),
    mensagemSucesso: () => cy.get('.alert-link'),
    errorMessageNameFiledEmpty: () => cy.get(':nth-child(3) > :nth-child(2)'),
    errorMessageFiledEmpty: () => cy.get('.alert > :nth-child(2)'),
  }

  visit() {
    cy.visit('/cadastrarusuarios')
  }

  fillName(nome) {
    this.elements
      .nomeInput()
      .should('be.visible')
      .type(nome)
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

  checkAdmin(isAdmin) {
    if (isAdmin === 'true') {
      this.elements
        .checkboxAdmin()
        .should('be.visible')
        .check()
    }
  }

  submit() {
    this.elements
      .cadastrarButton()
      .click()
  }

  validateMessageSuccess() {
    this.elements
      .mensagemSucesso()
      .should('be.visible')
      .and('contain', 'Cadastro realizado com sucesso')
  }

  register(user) {
    this.visit()
    this.fillName(user.nome)
    this.fillEmail(user.email)
    this.fillPassword(user.password)
    this.checkAdmin(user.administrador)
    this.submit()
  }

  validateEmptyFieldError(errorMessage) {
    this.elements
      .errorMessageNameFiledEmpty()
      .should('be.visible')
      .and('contain', errorMessage)
  }

  validateEmptyEmailFieldError() {
    this.elements
      .errorMessageEmailFiledEmpty()
      .should('be.visible')
      .and('contain', 'Email é obrigatório')
  }

  validateEmptyPasswordFieldError() {
    this.elements
      .errorMessagePasswordFiledEmpty()
      .should('be.visible')
      .and('contain', 'Password é obrigatório')
  }
}

export default new RegisterPage()