describe('Auth API', () => {

    it('Should login successfully with final user', () => {
        cy.createFinalUser()
            .then(({ user }) => {
                cy.loginApi(
                    user.email,
                    user.password
                ).then((token) => {
                    expect(token)
                        .to.not.be.empty
                })
            })
    })

    it('Should login successfully with admin user', () => {
        cy.createAdminUser()
            .then(({ user }) => {
                cy.loginApi(
                    user.email,
                    user.password
                ).then((token) => {
                    expect(token)
                        .to.not.be.empty
                })
            })
    })
})