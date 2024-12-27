describe('Settings Component', () => {
  beforeEach(() => {
    cy.visit('/doctor/settings')
  })

  it('should render the settings page', () => {
    cy.get('app-settings').should('be.visible')
  })

  it('should display the correct title', () => {
    cy.get('h1').contains('Settings')
  })

  it('should have all the settings options', () => {
    cy.get('.settings-option').should('have.length', 5)
    cy.get('.settings-option').eq(0).contains('Profile Settings')
    cy.get('.settings-option').eq(1).contains('Notification Settings')
    cy.get('.settings-option').eq(2).contains('Privacy Settings')
    cy.get('.settings-option').eq(3).contains('Account Settings')
    cy.get('.settings-option').eq(4).contains('Other Settings')
  })

  it('should navigate to the correct section on clicking a setting', () => {
    cy.get('.settings-option').eq(0).click()
    cy.url().should('include', '/doctor/settings/profile') // Update with the actual sub-route

    cy.get('.settings-option').eq(1).click()
    cy.url().should('include', '/doctor/settings/notifications') // Update with the actual sub-route
  })

  it('should save changes successfully', () => {
    cy.get('input[name="username"]').clear().type('Dr. John Doe')
    cy.get('button').contains('Save Changes').click()
    cy.get('.success-message').should('contain', 'Settings saved successfully')
  })
})
