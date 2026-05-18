import { API_URL } from '../constants/api'

class UserService {

  create(user) {
    return cy.request({
      method: 'POST',
      url: `${API_URL}/usuarios`,
      body: user,
      failOnStatusCode: false,
      retryOnNetworkFailure: true
    }).then((res) => {
      if (res.status === 201 && res.body._id) {
        const users = Cypress.env('createdUsers') || []
        Cypress.env('createdUsers', [...users, res.body._id])
      }
      return res
    })
  }


  getById(userId) {
    return cy.request({
      method: 'GET',
      url: `${API_URL}/usuarios/${userId}`
    })
  }

  delete(userId) {
    return cy.request({
      method: 'DELETE',
      url: `${API_URL}/usuarios/${userId}`,
      failOnStatusCode: false
    })
  }

  update(userId, updatedData) {
    return cy.request({
      method: 'PUT',
      url: `${API_URL}/usuarios/${userId}`,
      body: updatedData,
      failOnStatusCode: false
    })
  }
}

export default new UserService()