import './commands'
import { API_URL } from './constants/api'

beforeEach(() => {
    if (!Cypress.env('createdUsers')) Cypress.env('createdUsers', [])
    if (!Cypress.env('createdProducts')) Cypress.env('createdProducts', [])
})

after(() => {
    const products = Cypress.env('createdProducts') || []
    products.forEach(({ id, token }) => {
        cy.request({
            method: 'DELETE',
            url: `${API_URL}/produtos/${id}`,
            headers: { authorization: token },
            failOnStatusCode: false
        })
    })

    const users = Cypress.env('createdUsers') || []
    users.forEach(id => {
        cy.request({
            method: 'DELETE',
            url: `${API_URL}/usuarios/${id}`,
            failOnStatusCode: false
        })
    })
})