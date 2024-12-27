describe('Topbar Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the topbar', () => {
    cy.get('app-topbar').should('be.visible')
  })

  it('should display the logo', () => {
    cy.get('.logo-section .logo').should('exist')
    cy.get('.logo-section .logo').should('have.attr', 'alt', 'Logo')
  })

  it('should display the correct title', () => {
    cy.get('.logo-section .logo-text').contains('Hospital Management')
  })

  it('should have a working logout button', () => {
    cy.get('.logout-btn').should('be.visible')
    cy.get('.logout-btn').click()
  })
})
