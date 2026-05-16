import { faker } from '@faker-js/faker'
import ProductFactory from '../../support/factories/ProductFactory'
import ProductService from '../../support/services/ProductService'

describe('Products API', () => {

    it('Should create product successfully', () => {
        const product = ProductFactory.createProduct()
        cy.createAdminUser()
            .then(({ user }) => {
                cy.loginApi(
                    user.email,
                    user.password
                ).then((token) => {
                    ProductService
                        .create(product, token)
                        .then((response) => {
                            expect(response.status)
                                .to.eq(201)
                            expect(response.body.message)
                                .to.eq('Cadastro realizado com sucesso')
                        })
                })
            })
    })

    it('Should list products successfully', () => {
        cy.createAdminUser()
            .then(({ user }) => {
                cy.loginApi(
                    user.email,
                    user.password
                ).then((token) => {
                    ProductService
                        .list(token)
                        .then((response) => {
                            expect(response.status)
                                .to.eq(200)
                            expect(response.body.produtos)
                                .to.be.an('array')
                        })
                })
            })
    })
})