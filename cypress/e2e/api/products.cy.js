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
})