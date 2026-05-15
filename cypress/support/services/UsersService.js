import { API_URL } from '../constants/api'

class UserService {

  create(user) {

    return cy.request({

      method: 'POST',

      url: `${API_URL}/usuarios`,

      body: user,

      failOnStatusCode: false
    })
  }
}

export default new UserService()