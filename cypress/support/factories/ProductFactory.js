import { faker } from '@faker-js/faker'

class ProductFactory {
    createProduct() {
        return {
            nome: faker.commerce.productName(),
            preco: 100,
            descricao: faker.commerce.productDescription(),
            quantidade: 10
        }
    }
}

export default new ProductFactory()