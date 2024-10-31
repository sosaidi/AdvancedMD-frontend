describe('AppComponent Routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the app', () => {
    cy.get('app-root').should('exist');
  });

  it('should navigate to the admin dashboard', () => {
    cy.visit('/admin');
    cy.get('app-admin-dashboard').should('exist');
  });

  it('should navigate to the doctor dashboard', () => {
    cy.visit('/doctor');
    cy.get('app-doctor-dashboard').should('exist');
  });

  it('should navigate to the patient dashboard', () => {
    cy.visit('/patient');
    cy.get('app-patient-dashboard').should('exist');
  });
});
