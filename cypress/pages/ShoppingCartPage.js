class ShoppingCartPage {

  elements = {
    clearListButton: () =>
      cy.get('[data-testid="limparLista"]')
  }

  validateProductInList(productName) {
    cy.contains(productName)
      .should('be.visible')
  }

  clearShoppingList() {
    this.elements
      .clearListButton()
      .click()
  }

  validateEmptyList(productName) {
    cy.contains(productName)
      .should('not.exist')
  }
}

export default new ShoppingCartPage()