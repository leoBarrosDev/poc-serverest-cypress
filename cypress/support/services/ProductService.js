import { API_URL } from '../constants/api'

class ProductService {

    create(product, token) {
        return cy.request({
            method: 'POST',
            url: `${API_URL}/produtos`,
            headers: {
                Authorization: token
            },
            body: product,
            failOnStatusCode: false
        }).then(res => {
            if (res.status === 201 && res.body._id) {
                const products = Cypress.env('createdProducts') || []
                Cypress.env('createdProducts', [...products, { id: res.body._id, token }])
            }
            return res
        })
    }

    list(token) {
        return cy.request({
            method: 'GET',
            url: `${API_URL}/produtos`,
            headers: {
                Authorization: token
            },
            failOnStatusCode: false
        })
    }
}

export default new ProductService()