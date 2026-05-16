import { faker } from '@faker-js/faker'

class UserFactory {
    createUser() {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: '123456',
            administrador: 'true'
        }
    }

    createFinalUser() {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: '123456',
            administrador: 'false'
        }
    }
}

export default new UserFactory()