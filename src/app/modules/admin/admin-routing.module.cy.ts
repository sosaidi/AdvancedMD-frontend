describe('Admin Routing', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('should navigate to the admin dashboard', () => {
    cy.visit('/admin/dashboard');
    cy.get('app-admin-dashboard').should('exist');
  });

  it('should navigate to the appointments page', () => {
    cy.visit('/admin/appointments');
    cy.get('app-appointment').should('exist');
  });

  it('should navigate to the doctors page', () => {
    cy.visit('/admin/doctors');
    cy.get('app-doctors').should('exist');
  });

  it('should navigate to the patients page', () => {
    cy.visit('/admin/patients');
    cy.get('app-patients').should('exist');
  });

  it('should redirect to the admin dashboard if no path is specified', () => {
    cy.visit('/admin');
    cy.url().should('include', '/admin/dashboard');
  });
});
