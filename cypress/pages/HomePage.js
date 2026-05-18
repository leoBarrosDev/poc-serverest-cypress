class HomePage {

    addProductToList(productName) {
        cy.contains('.card', productName)
            .within(() => {
                cy.get('[data-testid="adicionarNaLista"]')
                    .click()
            })
    }

    accessShoppingList() {
        cy.contains('a', 'Lista de Compras')
            .click()
    }

    accessProductList() {
        cy.contains('a', 'Listar Produtos')
            .click()
    }

    validateLoginSuccess() {
        cy.url()
            .should('include', '/home')
    }

    validateLoginError() {
        cy.contains('div', 'Email e/ou senha inválidos')
            .should('be.visible')
    }

    validateProductExists(productName) {
        cy.contains(productName)
            .should('be.visible')
    }
}

export default new HomePage()