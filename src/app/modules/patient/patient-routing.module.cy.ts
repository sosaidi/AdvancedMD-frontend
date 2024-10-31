describe('Patient Routing', () => {
  beforeEach(() => {
    cy.visit('/patient');
  });

  it('should navigate to the patient dashboard', () => {
    cy.visit('/patient/dashboard');
    cy.get('app-patient-dashboard').should('exist');
  });

  it('should navigate to the appointments page', () => {
    cy.visit('/patient/appointments');
    cy.get('app-appointments').should('exist');
  });

  it('should navigate to the billing page', () => {
    cy.visit('/patient/billing');
    cy.get('app-billing').should('exist');
  });

  it('should navigate to the medical records page', () => {
    cy.visit('/patient/medicalrecords');
    cy.get('app-medical-records').should('exist');
  });

  it('should navigate to the prescriptions page', () => {
    cy.visit('/patient/prescriptions');
    cy.get('app-prescriptions').should('exist');
  });

  it('should navigate to the settings page', () => {
    cy.visit('/patient/settings');
    cy.get('app-settings').should('exist');
  });

  it('should redirect to the dashboard if no path is specified', () => {
    cy.visit('/patient');
    cy.url().should('include', '/patient/dashboard');
  });
});
