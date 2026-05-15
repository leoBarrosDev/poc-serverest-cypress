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
}

export default new UserFactory()