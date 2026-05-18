import { faker } from '@faker-js/faker'
import HomePage from '../../pages/HomePage'
import ShoppingCartPage from '../../pages/ShoppingCartPage'
import LoginPage from '../../pages/LoginPage'

describe('Shopping List Flow', () => {

  let adminUser
  let finalUser
  let productName

  beforeEach(() => {
    productName = `${faker.commerce.product()} ${Date.now()}`

    cy.createAdminUser().then(({ user }) => {
      adminUser = user
      cy.createProductViaAPI(adminUser.email, adminUser.password, productName)
    })

    cy.createFinalUser().then(({ user }) => {
      finalUser = user
    })
  })

  it('Should add products to shopping list successfully', () => {
    LoginPage.login(finalUser.email, finalUser.password)
    HomePage.validateLoginSuccess()
    HomePage.addProductToList(productName)
    HomePage.accessShoppingList()
    ShoppingCartPage.validateProductInList(productName)
  })

  it('Should clear shopping list successfully', () => {
    LoginPage.login(finalUser.email, finalUser.password)
    HomePage.validateLoginSuccess()
    HomePage.addProductToList(productName)
    HomePage.accessShoppingList()
    ShoppingCartPage.validateProductInList(productName)
    ShoppingCartPage.clearShoppingList()
    ShoppingCartPage.validateEmptyList(productName)
  })

  it('Admin flow: validate product persisted via API matches the Frontend Listar Produtos', () => {
    LoginPage.login(adminUser.email, adminUser.password)
    HomePage.validateLoginSuccess()
    HomePage.accessProductList()
    HomePage.validateProductExists(productName)
  })
})