describe('Admin Routing', () => {
  beforeEach(() => {
    cy.visit('/admin')
  })

  it('should navigate to the admin dashboard', () => {
    cy.visit('/admin/dashboard')
    cy.get('app-admin-dashboard').should('exist')
  })

  
  it('should navigate to the payments page', () => {
    cy.visit('/admin/payments')
    cy.get('app-payments').should('exist')
  })

  it('should navigate to the appointments page', () => {
    cy.visit('/admin/appointments')
    cy.get('app-appointments').should('exist')
  })

  it('should navigate to the doctors page', () => {
    cy.visit('/admin/staff')
    cy.get('app-staff').should('exist')
  })

  it('should navigate to the patients page', () => {
    cy.visit('/admin/patients')
    cy.get('app-patients').should('exist')
  })

  it('should redirect to the admin dashboard if no path is specified', () => {
    cy.visit('/admin')
    cy.url().should('include', '/admin/dashboard')
  })
})
