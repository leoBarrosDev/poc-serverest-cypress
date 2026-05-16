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